import { User } from '@/models'
import { create } from 'zustand'

interface AuthStore {
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void
  profile: User | null
  setProfile: (profile: User | null) => void
  reset: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated: isAuthenticated }),
  profile: null,
  setProfile: (profile: User | null) => set({ profile: profile }),
  reset: () => set({ profile: null, isAuthenticated: false })
}))
