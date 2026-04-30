import type { User } from '@supabase/supabase-js'
import { supabase } from './supabase'
import { slugify } from './slug'
import { HARDCODED_ADMIN_PASSWORD } from './adminAuth'
import {
  normalizeWhitespace,
  validateArticleBody,
  validateArticleDeck,
  validateArticleStatus,
  validateDesignation,
  validateDisplayName,
  validateArticleTitle,
  validateImageFile,
  validateProfileImageFile,
  validateTags,
  validateUuid,
} from './validation'
import type { CommunityArticle, CommunityArticleDraft } from '../types/communityArticles'
import type { Database } from '../types/supabase'
import type { AdminProfile, Profile } from '../types/auth'

type AdminRow = Database['public']['Tables']['app_admins']['Row']
type ArticleRow = Database['public']['Tables']['articles']['Row']
type ProfileRow = Database['public']['Tables']['profiles']['Row']
type AdminReviewArticleRow = ArticleRow & {
  author_avatar_url: string | null
  author_designation: string | null
  author_display_name: string | null
  author_username: string | null
}

function getAdminRpcErrorMessage(error: { code?: string; message?: string }) {
  if (error.code === 'PGRST202') {
    return 'Admin review functions are missing in Supabase. Run supabase/schema.sql in the Supabase SQL editor, then reload the admin page.'
  }

  return error.message || 'Admin review request failed.'
}

function toAdminProfile(row: AdminRow): AdminProfile {
  return {
    id: row.id,
    email: row.email,
    createdAt: row.created_at,
  }
}

function toProfile(row: ProfileRow): Profile {
  return {
    id: row.id,
    displayName: row.display_name,
    username: row.username,
    bio: row.bio,
    avatarUrl: row.avatar_url,
    designation: row.designation,
  }
}

function toCommunityArticle(article: ArticleRow, profile?: ProfileRow | null): CommunityArticle {
  return {
    id: article.id,
    authorId: article.author_id,
    authorAvatarUrl: profile?.avatar_url || null,
    authorDesignation: profile?.designation || null,
    authorName:
      profile?.display_name || profile?.username || 'AI Tank contributor',
    body: article.body,
    coverImageUrl: article.cover_image_url,
    createdAt: article.created_at,
    deck: article.deck,
    publishedAt: article.published_at,
    section: article.section,
    slug: article.slug,
    status: article.status,
    tags: article.tags,
    title: article.title,
    updatedAt: article.updated_at,
  }
}

export async function ensureProfile(user: User) {
  if (!supabase) {
    return null
  }

  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle()

  const payload = {
    id: user.id,
    display_name:
      typeof user.user_metadata.display_name === 'string'
        ? user.user_metadata.display_name
        : existingProfile?.display_name ?? null,
    username:
      typeof user.user_metadata.user_name === 'string'
        ? user.user_metadata.user_name
        : existingProfile?.username ?? null,
    designation:
      typeof user.user_metadata.designation === 'string'
        ? user.user_metadata.designation
        : existingProfile?.designation ?? null,
    avatar_url:
      typeof user.user_metadata.avatar_url === 'string'
        ? user.user_metadata.avatar_url
        : existingProfile?.avatar_url ?? null,
  }

  const { data, error } = await supabase
    .from('profiles')
    .upsert(payload, { onConflict: 'id' })
    .select()
    .single()

  if (error) {
    throw new Error(getAdminRpcErrorMessage(error))
  }

  return toProfile(data)
}

export async function getProfile(userId: string) {
  if (!supabase) {
    return null
  }

  const validationError = validateUuid(userId, 'User ID')
  if (validationError) {
    throw new Error(validationError)
  }

  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single()

  if (error) {
    throw error
  }

  return toProfile(data)
}

export async function getAdminProfileByEmail(email: string | undefined | null) {
  if (!supabase || !email) {
    return null
  }

  const { data, error } = await supabase
    .from('app_admins')
    .select('*')
    .eq('email', email.trim().toLowerCase())
    .maybeSingle()

  if (error) {
    throw error
  }

  return data ? toAdminProfile(data) : null
}

export async function updateProfileDetails(
  userId: string,
  details: {
    avatarUrl?: string | null
    designation?: string | null
    displayName?: string | null
  },
) {
  if (!supabase) {
    return null
  }

  const normalizedDesignation =
    typeof details.designation === 'string' ? normalizeWhitespace(details.designation) : null
  const normalizedDisplayName =
    typeof details.displayName === 'string' ? normalizeWhitespace(details.displayName) : null
  const validationError =
    validateUuid(userId, 'User ID') ||
    (normalizedDisplayName ? validateDisplayName(normalizedDisplayName) : null) ||
    (normalizedDesignation ? validateDesignation(normalizedDesignation) : null)

  if (validationError) {
    throw new Error(validationError)
  }

  const { data, error } = await supabase
    .from('profiles')
    .update({
      avatar_url: details.avatarUrl ?? null,
      designation: normalizedDesignation,
      display_name: normalizedDisplayName,
    })
    .eq('id', userId)
    .select()
    .single()

  if (error) {
    throw error
  }

  return toProfile(data)
}

export async function uploadProfilePicture(userId: string, file: File) {
  if (!supabase) {
    throw new Error('Supabase is not configured.')
  }

  const validationError = validateUuid(userId, 'User ID') || validateProfileImageFile(file)
  if (validationError) {
    throw new Error(validationError)
  }

  const extension = file.name.includes('.') ? file.name.split('.').pop()?.toLowerCase() : 'jpg'
  const filePath = `${userId}/profile-${crypto.randomUUID()}.${extension || 'jpg'}`

  const { error: uploadError } = await supabase.storage
    .from('profile-pictures')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (uploadError) {
    throw new Error(`Profile picture upload failed: ${uploadError.message}`)
  }

  const { data } = supabase.storage.from('profile-pictures').getPublicUrl(filePath)

  return data.publicUrl
}

export async function createCommunityArticle(authorId: string, draft: CommunityArticleDraft) {
  if (!supabase) {
    throw new Error('Supabase is not configured.')
  }

  const normalizedTitle = normalizeWhitespace(draft.title)
  const normalizedDeck = normalizeWhitespace(draft.deck)
  const normalizedBody = draft.body.trim()
  const validationError =
    validateUuid(authorId, 'Author ID') ||
    validateArticleTitle(normalizedTitle) ||
    validateArticleDeck(normalizedDeck) ||
    validateTags(draft.tags) ||
    validateArticleBody(normalizedBody) ||
    validateArticleStatus(draft.status)

  if (validationError) {
    throw new Error(validationError)
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError) {
    throw userError
  }

  if (!user || user.id !== authorId) {
    throw new Error('Your session is missing or does not match this author.')
  }

  try {
    await ensureProfile(user)
  } catch (error) {
    const details = error instanceof Error ? error.message : 'Unknown profile sync error.'
    throw new Error(`Profile sync failed: ${details}`)
  }

  const baseSlug = slugify(normalizedTitle)
  const slug = `${baseSlug}-${crypto.randomUUID().slice(0, 8)}`
  const safeStatus = draft.status === 'pending_review' ? 'pending_review' : 'draft'

  const { data, error } = await supabase
    .from('articles')
    .insert({
      author_id: authorId,
      body: normalizedBody,
      cover_image_url: draft.coverImageUrl || null,
      deck: normalizedDeck,
      published_at: null,
      section: draft.section,
      slug,
      status: safeStatus,
      tags: draft.tags,
      title: normalizedTitle,
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Article insert failed: ${error.message}`)
  }

  const profile = await getProfile(authorId)

  return {
    article: toCommunityArticle(data, profile && {
      id: profile.id,
      avatar_url: profile.avatarUrl,
      bio: profile.bio,
      created_at: '',
      designation: profile.designation,
      display_name: profile.displayName,
      updated_at: '',
      username: profile.username,
    }),
  }
}

export async function uploadArticleCoverImage(authorId: string, file: File) {
  if (!supabase) {
    throw new Error('Supabase is not configured.')
  }

  const validationError = validateUuid(authorId, 'Author ID') || validateImageFile(file)
  if (validationError) {
    throw new Error(validationError)
  }

  const extension = file.name.includes('.') ? file.name.split('.').pop()?.toLowerCase() : 'jpg'
  const filePath = `${authorId}/${crypto.randomUUID()}.${extension || 'jpg'}`

  const { error: uploadError } = await supabase.storage
    .from('article-covers')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (uploadError) {
    throw new Error(`Cover upload failed: ${uploadError.message}`)
  }

  const { data } = supabase.storage.from('article-covers').getPublicUrl(filePath)

  return data.publicUrl
}

export async function fetchCommunityArticleBySlug(slug: string) {
  if (!supabase) {
    return null
  }

  const normalizedSlug = slug.trim().toLowerCase()
  if (!/^[a-z0-9-]{3,180}$/.test(normalizedSlug)) {
    return null
  }

  const { data, error } = await supabase.from('articles').select('*').eq('slug', normalizedSlug).single()

  if (error) {
    if (error.code === 'PGRST116') {
      return null
    }

    throw error
  }

  const { data: profileData } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.author_id)
    .maybeSingle()

  return toCommunityArticle(data, profileData)
}

export async function fetchMyArticles(authorId: string) {
  if (!supabase) {
    return []
  }

  const validationError = validateUuid(authorId, 'Author ID')
  if (validationError) {
    throw new Error(validationError)
  }

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('author_id', authorId)
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  const profile = await getProfile(authorId)

  return data.map((article) =>
    toCommunityArticle(article, profile && {
      id: profile.id,
      avatar_url: profile.avatarUrl,
      bio: profile.bio,
      created_at: '',
      designation: profile.designation,
      display_name: profile.displayName,
      updated_at: '',
      username: profile.username,
    }),
  )
}

export async function fetchPublishedCommunityArticles(limit = 8) {
  if (!supabase) {
    return []
  }

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    throw error
  }

  if (!data.length) {
    return []
  }

  const authorIds = [...new Set(data.map((article) => article.author_id))]
  const { data: profiles } = await supabase
    .from('profiles')
    .select('*')
    .in('id', authorIds)

  const profilesById = new Map((profiles ?? []).map((profile) => [profile.id, profile]))

  return data.map((article) => toCommunityArticle(article, profilesById.get(article.author_id)))
}

export async function fetchAdminReviewArticles() {
  if (!supabase) {
    return []
  }

  const { data, error } = await supabase
    .rpc('admin_fetch_review_articles', {
      admin_password: HARDCODED_ADMIN_PASSWORD,
    })

  if (error) {
    throw error
  }

  return (data as AdminReviewArticleRow[]).map((article) =>
    toCommunityArticle(article, {
      id: article.author_id,
      avatar_url: article.author_avatar_url,
      bio: null,
      created_at: '',
      designation: article.author_designation,
      display_name: article.author_display_name,
      updated_at: '',
      username: article.author_username,
    }),
  )
}

export async function updateArticleReviewStatus(
  articleId: string,
  status: 'published' | 'rejected',
) {
  if (!supabase) {
    throw new Error('Supabase is not configured.')
  }

  const validationError =
    validateUuid(articleId, 'Article ID') ||
    (status !== 'published' && status !== 'rejected' ? 'Review status is invalid.' : null)

  if (validationError) {
    throw new Error(validationError)
  }

  const { data, error } = await supabase
    .rpc('admin_update_article_review_status', {
      admin_password: HARDCODED_ADMIN_PASSWORD,
      article_id: articleId,
      next_status: status,
    })
    .single()

  if (error) {
    throw new Error(`Article review update failed: ${getAdminRpcErrorMessage(error)}`)
  }

  const article = data as AdminReviewArticleRow

  return toCommunityArticle(article, {
    id: article.author_id,
    avatar_url: article.author_avatar_url,
    bio: null,
    created_at: '',
    designation: article.author_designation,
    display_name: article.author_display_name,
    updated_at: '',
    username: article.author_username,
  })
}

export async function deleteCommunityArticle(articleId: string, authorId: string) {
  if (!supabase) {
    throw new Error('Supabase is not configured.')
  }

  const validationError =
    validateUuid(articleId, 'Article ID') || validateUuid(authorId, 'Author ID')

  if (validationError) {
    throw new Error(validationError)
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError) {
    throw userError
  }

  if (!user || user.id !== authorId) {
    throw new Error('Your session is missing or does not match this author.')
  }

  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', articleId)
    .eq('author_id', authorId)

  if (error) {
    throw new Error(`Article delete failed: ${error.message}`)
  }
}
