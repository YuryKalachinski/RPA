import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context'
import './Navbar.css'
import {
  ABOUT_ROUTE,
  USERS_ROUTE,
  MAIN_ROUTE,
  SUBSTATIONS_ROUTE,
  LOGIN_ROUTE,
} from '../../../utils/constants'

const Navbar = () => {
  const { host, setHost } = useContext(AuthContext)
  const navigate = useNavigate()

  const logout = () => {
    setHost(null)
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    navigate(LOGIN_ROUTE, { replace: true })
  }

  return host ? (
    <div className="navbar">
      <button onClick={logout}>Выйти</button>
      <div className="navbar__links">
        <button onClick={() => navigate(MAIN_ROUTE, { replace: true })}>
          Main
        </button>
        <button onClick={() => navigate(SUBSTATIONS_ROUTE, { replace: true })}>
          Substations
        </button>
        <button onClick={() => navigate(USERS_ROUTE, { replace: true })}>
          Users
        </button>
        <button onClick={() => navigate(ABOUT_ROUTE, { replace: true })}>
          About
        </button>
      </div>
    </div>
  ) : (
    <div className="navbar">
      <div className="navbar__links"></div>
    </div>
  )
}

export default Navbar
