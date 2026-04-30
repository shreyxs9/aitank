import type { CommunityArticleStatus } from '../types/communityArticles'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const safeTextPattern = /^[\p{L}\p{N}\s.,:;!?'"()&/@#+\-–—_]+$/u

export function normalizeWhitespace(value: string) {
  return value.trim().replace(/\s+/g, ' ')
}

export function validateEmail(email: string) {
  const normalizedEmail = email.trim().toLowerCase()

  if (!normalizedEmail) {
    return 'Enter an email address.'
  }

  if (normalizedEmail.length > 254 || !emailPattern.test(normalizedEmail)) {
    return 'Enter a valid email address.'
  }

  return null
}

export function validatePassword(password: string, minimumLength = 6) {
  if (!password) {
    return 'Enter a password.'
  }

  if (password.length < minimumLength) {
    return `Password must be at least ${minimumLength} characters.`
  }

  if (password.length > 128) {
    return 'Password must be 128 characters or fewer.'
  }

  return null
}

export function validateDisplayName(displayName: string) {
  const normalizedDisplayName = normalizeWhitespace(displayName)

  if (!normalizedDisplayName) {
    return null
  }

  if (normalizedDisplayName.length < 2 || normalizedDisplayName.length > 60) {
    return 'Display name must be 2 to 60 characters.'
  }

  if (!safeTextPattern.test(normalizedDisplayName)) {
    return 'Display name contains unsupported characters.'
  }

  return null
}

export function validateDesignation(designation: string) {
  const normalizedDesignation = normalizeWhitespace(designation)

  if (!normalizedDesignation) {
    return null
  }

  if (normalizedDesignation.length < 2 || normalizedDesignation.length > 90) {
    return 'Designation must be 2 to 90 characters.'
  }

  if (!safeTextPattern.test(normalizedDesignation)) {
    return 'Designation contains unsupported characters.'
  }

  return null
}

export function validateAdminUsername(username: string) {
  const normalizedUsername = username.trim().toLowerCase()

  if (!normalizedUsername) {
    return 'Enter the admin ID.'
  }

  if (normalizedUsername.length > 80) {
    return 'Admin ID is too long.'
  }

  if (!/^[a-z0-9.-]+$/.test(normalizedUsername)) {
    return 'Admin ID can only use lowercase letters, numbers, dots, and hyphens.'
  }

  return null
}

export function validateArticleTitle(title: string) {
  const normalizedTitle = normalizeWhitespace(title)

  if (!normalizedTitle) {
    return 'Enter a headline.'
  }

  if (normalizedTitle.length < 8 || normalizedTitle.length > 110) {
    return 'Headline must be 8 to 110 characters.'
  }

  return null
}

export function validateArticleDeck(deck: string) {
  const normalizedDeck = normalizeWhitespace(deck)

  if (!normalizedDeck) {
    return 'Enter a deck.'
  }

  if (normalizedDeck.length < 30 || normalizedDeck.length > 220) {
    return 'Deck must be 30 to 220 characters.'
  }

  return null
}

export function parseTags(tags: string) {
  return tags
    .split(',')
    .map((item) => normalizeWhitespace(item))
    .filter(Boolean)
    .slice(0, 6)
}

export function validateTags(tags: string[]) {
  if (tags.length === 0) {
    return 'Add at least one tag.'
  }

  const invalidTag = tags.find(
    (tag) => tag.length < 2 || tag.length > 28 || !/^[\p{L}\p{N}\s+#&/-]+$/u.test(tag),
  )

  if (invalidTag) {
    return 'Tags must be 2 to 28 characters and use simple text.'
  }

  return null
}

export function validateArticleBody(body: string) {
  const normalizedBody = body.trim()
  const words = normalizedBody.split(/\s+/).filter(Boolean).length

  if (!normalizedBody) {
    return 'Enter the article body.'
  }

  if (words < 120) {
    return 'Article body must be at least 120 words.'
  }

  if (normalizedBody.length > 30000) {
    return 'Article body must be 30,000 characters or fewer.'
  }

  return null
}

export function validateArticleStatus(status: CommunityArticleStatus) {
  if (status !== 'draft' && status !== 'pending_review') {
    return 'Choose Draft or Review before saving.'
  }

  return null
}

export function validateImageFile(file: File) {
  const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp'])

  if (!allowedTypes.has(file.type)) {
    return 'Choose a JPG, PNG, or WebP image for the cover.'
  }

  if (file.size > 5 * 1024 * 1024) {
    return 'Cover image must be smaller than 5 MB.'
  }

  if (file.name.length > 160) {
    return 'Cover image filename is too long.'
  }

  return null
}

export function validateProfileImageFile(file: File) {
  const validationError = validateImageFile(file)

  if (validationError) {
    return validationError.replace('cover', 'profile picture').replace('Cover', 'Profile picture')
  }

  return null
}

export function validateUuid(value: string, label = 'ID') {
  if (!uuidPattern.test(value)) {
    return `${label} is invalid.`
  }

  return null
}
