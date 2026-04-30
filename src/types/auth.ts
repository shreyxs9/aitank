export interface Profile {
  id: string
  displayName: string | null
  username: string | null
  bio: string | null
  avatarUrl: string | null
  designation: string | null
}

export interface AdminProfile {
  id: string
  email: string
  createdAt: string
}
