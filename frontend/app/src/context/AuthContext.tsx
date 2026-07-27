import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { api, getToken, setToken, clearToken, ApiError } from '../lib/api'

interface User {
  id: number
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Cek token yang udah ada (kalau user refresh halaman, jangan ke-logout)
    const token = getToken()
    if (!token) {
      setLoading(false)
      return
    }

    api
      .get<User>('/user')
      .then((data) => setUser(data))
      .catch(() => {
        // Token expired/invalid
        clearToken()
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  const login = async (email: string, password: string) => {
    const data = await api.post<{ user: User; token: string }>('/login', { email, password })
    setToken(data.token)
    setUser(data.user)
  }

  const signOut = async () => {
    try {
      await api.post('/logout')
    } catch {
      // Token mungkin udah invalid duluan, tetep lanjut clear session lokal
    }
    clearToken()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth harus dipakai di dalam AuthProvider')
  return context
}

export { ApiError }
