import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)
const KEY = 'glammart:auth:v1'

const load = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY))
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(load)

  useEffect(() => {
    try {
      if (user) localStorage.setItem(KEY, JSON.stringify(user))
      else localStorage.removeItem(KEY)
    } catch {
      /* ignore */
    }
  }, [user])

  const login = (email) => {
    const u = { email, name: email.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) }
    setUser(u)
    return u
  }

  const signup = (name, email) => {
    const u = { email, name }
    setUser(u)
    return u
  }

  const logout = () => setUser(null)

  return <AuthContext.Provider value={{ user, login, signup, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
