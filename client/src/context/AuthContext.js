import {createContext} from "react"

// пустая функция которая ничего не делает
function noop() {}

export const AuthContext = createContext({
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuthenticated: false
})