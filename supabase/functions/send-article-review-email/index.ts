import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.104.0'
import nodemailer from 'npm:nodemailer@6.9.16'

type ReviewStatus = 'published' | 'rejected'

type ReviewArticle = {
  author_avatar_url: string | null
  author_designation: string | null
  author_display_name: string | null
  author_id: string
  author_username: string | null
  body: string
  cover_image_url: string | null
  created_at: string
  deck: string
  id: string
  published_at: string | null
  section: string
  slug: string
  status: ReviewStatus
  tags: string[]
  title: string
  updated_at: string
}

type ReviewEmailDelivery =
  | {
      message?: string
      sent: true
    }
  | {
      error: string
      sent: false
    }

const corsHeaders = {
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  })
}

function getPublicArticleUrl(slug: string) {
  const siteUrl = Deno.env.get('SITE_URL')?.replace(/\/+$/, '')

  return siteUrl ? `${siteUrl}/article/${slug}` : null
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const replacements: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }

    return replacements[character]
  })
}

function getReviewEmail(article: ReviewArticle, recipientName: string, articleUrl: string | null) {
  const isApproved = article.status === 'published'
  const decisionLabel = isApproved ? 'approved' : 'rejected'
  const subject = `Your AI Tank article was ${decisionLabel}`
  const intro = isApproved
    ? 'Your submitted article has been approved and is now live on AI Tank.'
    : 'Your submitted article was reviewed and rejected by the AI Tank admin team.'
  const nextStep = isApproved && articleUrl
    ? `You can read it here: ${articleUrl}`
    : isApproved
      ? 'You can open AI Tank to view it live.'
      : 'You can update the article from your contributor workspace and submit it again when it is ready.'

  return {
    html: `
      <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#111827">
        <p>Hi ${escapeHtml(recipientName)},</p>
        <p>${intro}</p>
        <p><strong>Article:</strong> ${escapeHtml(article.title)}</p>
        <p>${escapeHtml(nextStep)}</p>
        <p>AI Tank</p>
      </div>
    `,
    subject,
    text: [
      `Hi ${recipientName},`,
      '',
      intro,
      '',
      `Article: ${article.title}`,
      nextStep,
      '',
      'AI Tank',
    ].join('\n'),
  }
}

function successResponse(article: ReviewArticle, emailDelivery: ReviewEmailDelivery) {
  return jsonResponse({ article, email_delivery: emailDelivery })
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed.' }, 405)
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  const smtpHost = Deno.env.get('SMTP_HOST')
  const smtpPort = Number(Deno.env.get('SMTP_PORT') || '587')
  const smtpUser = Deno.env.get('SMTP_USER')
  const smtpPass = Deno.env.get('SMTP_PASS')
  const smtpSecure = Deno.env.get('SMTP_SECURE') === 'true'
  const fromEmail = Deno.env.get('REVIEW_NOTIFICATION_FROM')

  if (!supabaseUrl || !serviceRoleKey || !smtpHost || !smtpUser || !smtpPass || !fromEmail) {
    return jsonResponse(
      { error: 'Review email function is missing required environment variables.' },
      500,
    )
  }

  let body: { admin_password?: string; article_id?: string; next_status?: ReviewStatus }

  try {
    body = await request.json()
  } catch {
    return jsonResponse({ error: 'Request body must be valid JSON.' }, 400)
  }

  if (!body.admin_password || !body.article_id) {
    return jsonResponse({ error: 'Admin password and article ID are required.' }, 400)
  }

  if (body.next_status !== 'published' && body.next_status !== 'rejected') {
    return jsonResponse({ error: 'Review status must be published or rejected.' }, 400)
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  const { data: article, error: updateError } = await supabase
    .rpc('admin_update_article_review_status', {
      admin_password: body.admin_password,
      article_id: body.article_id,
      next_status: body.next_status,
    })
    .single<ReviewArticle>()

  if (updateError || !article) {
    return jsonResponse(
      { error: updateError?.message || 'Could not update article review status.' },
      400,
    )
  }

  const { data: author, error: authorError } = await supabase.auth.admin.getUserById(
    article.author_id,
  )

  if (authorError || !author.user?.email) {
    return jsonResponse(
      { error: authorError?.message || 'Could not find the article author email address.' },
      500,
    )
  }

  const recipientName =
    article.author_display_name || article.author_username || author.user.email.split('@')[0]
  const email = getReviewEmail(article, recipientName, getPublicArticleUrl(article.slug))
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })

  try {
    await transporter.sendMail({
      from: fromEmail,
      to: author.user.email,
      subject: email.subject,
      html: email.html,
      text: email.text,
    })
  } catch (error) {
    return successResponse(article, {
      error: `Article status was updated, but email sending failed: ${
        error instanceof Error ? error.message : 'Unknown SMTP error.'
      }`,
      sent: false,
    })
  }

  return successResponse(article, { sent: true })
})
