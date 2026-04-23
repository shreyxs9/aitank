import type { User } from '@supabase/supabase-js'
import { supabase } from './supabase'
import { slugify } from './slug'
import type { CommunityArticle, CommunityArticleDraft } from '../types/communityArticles'
import type { Database } from '../types/supabase'
import type { Profile } from '../types/auth'

type ArticleRow = Database['public']['Tables']['articles']['Row']
type ProfileRow = Database['public']['Tables']['profiles']['Row']

function toProfile(row: ProfileRow): Profile {
  return {
    id: row.id,
    displayName: row.display_name,
    username: row.username,
    bio: row.bio,
    avatarUrl: row.avatar_url,
  }
}

function toCommunityArticle(article: ArticleRow, profile?: ProfileRow | null): CommunityArticle {
  return {
    id: article.id,
    authorId: article.author_id,
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

  const payload = {
    id: user.id,
    display_name:
      typeof user.user_metadata.display_name === 'string'
        ? user.user_metadata.display_name
        : null,
    username:
      typeof user.user_metadata.user_name === 'string'
        ? user.user_metadata.user_name
        : null,
    avatar_url:
      typeof user.user_metadata.avatar_url === 'string'
        ? user.user_metadata.avatar_url
        : null,
  }

  const { data, error } = await supabase
    .from('profiles')
    .upsert(payload, { onConflict: 'id' })
    .select()
    .single()

  if (error) {
    throw error
  }

  return toProfile(data)
}

export async function getProfile(userId: string) {
  if (!supabase) {
    return null
  }

  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single()

  if (error) {
    throw error
  }

  return toProfile(data)
}

export async function createCommunityArticle(authorId: string, draft: CommunityArticleDraft) {
  if (!supabase) {
    throw new Error('Supabase is not configured.')
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

  const baseSlug = slugify(draft.title)
  const slug = `${baseSlug}-${crypto.randomUUID().slice(0, 8)}`

  const { data, error } = await supabase
    .from('articles')
    .insert({
      author_id: authorId,
      body: draft.body,
      cover_image_url: draft.coverImageUrl || null,
      deck: draft.deck,
      published_at: draft.status === 'published' ? new Date().toISOString() : null,
      section: draft.section,
      slug,
      status: draft.status,
      tags: draft.tags,
      title: draft.title,
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

  const { data, error } = await supabase.from('articles').select('*').eq('slug', slug).single()

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
      display_name: profile.displayName,
      updated_at: '',
      username: profile.username,
    }),
  )
}

export async function deleteCommunityArticle(articleId: string, authorId: string) {
  if (!supabase) {
    throw new Error('Supabase is not configured.')
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
