import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context'
import { authenticate } from '../http/userAPI'
import { MAIN_ROUTE, ACCESS_TOKEN, REFRESH_TOKEN } from '../utils/constants'
import { getHostFromJwtToken } from '../utils/methods'

const Login = () => {
  const { setHost } = useContext(AuthContext)
  const navigate = useNavigate()
  const [user, setUser] = useState({ email: '', password: '' })

  const login = async (event) => {
    event.preventDefault()
    try {
      const response = await authenticate(user.email, user.password)
      const accessToken = response.data.access_token
      localStorage.setItem(ACCESS_TOKEN, accessToken)
      const refreshToken = response.data.refresh_token
      localStorage.setItem(REFRESH_TOKEN, refreshToken)
      setHost(getHostFromJwtToken(accessToken))
      navigate(MAIN_ROUTE)
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  return (
    <div>
      <form onSubmit={login}>
        <input
          type="text"
          placeholder="Login"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button>Enter</button>
      </form>
    </div>
  )
}

export default Login
