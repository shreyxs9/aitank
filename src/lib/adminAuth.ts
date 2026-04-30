export const HARDCODED_ADMIN_USERNAME = 'aitank.com'
export const HARDCODED_ADMIN_PASSWORD = 'aitank2026'

const ADMIN_SESSION_KEY = 'aitank-admin-session'

export function isHardcodedAdminSession() {
  return window.localStorage.getItem(ADMIN_SESSION_KEY) === 'true'
}

export function signInHardcodedAdmin(username: string, password: string) {
  const isValid =
    username.trim().toLowerCase() === HARDCODED_ADMIN_USERNAME &&
    password === HARDCODED_ADMIN_PASSWORD

  if (isValid) {
    window.localStorage.setItem(ADMIN_SESSION_KEY, 'true')
  }

  return isValid
}

export function signOutHardcodedAdmin() {
  window.localStorage.removeItem(ADMIN_SESSION_KEY)
}
