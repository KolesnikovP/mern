// авторизация пользователя в системе, позволяющая зайти в систему или из нее выйти

import {useCallback, useEffect, useState} from "react";

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  /* ready нужен чтобы хук еффекта который проверяет наличие токена и поскольку он асинхронный
  * то он подгружает роуты в которой отсутствует авторизация, для этого мы добавляем этот флаг */
  const [ready, setReady] = useState(false)
  const [userId, setUserId] = useState(null)

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken)
    setUserId(id)

    localStorage.setItem(storageName, JSON.stringify({
      userId: id, token: jwtToken
    }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.token) {
      login(data.token, data.id)
    }
    setReady(true)
  }, [login])

  return {login, logout, token, userId, ready}
}