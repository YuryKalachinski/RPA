import React, { useContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthContext } from '../context'
import { privateRoutes, publicRoutes } from '../routers'
import { ACCESS_TOKEN } from '../utils/constants'
import { getHostFromJwtToken } from '../utils/methods'

const AppRouter = () => {
  const { host, setHost } = useContext(AuthContext)

  useEffect(() => {
    let accessToken
    if ((accessToken = localStorage.getItem(ACCESS_TOKEN))) {
      setHost(getHostFromJwtToken(accessToken))
    }
    console.log('AppRouter/useEffect')
  }, [setHost])

  return host ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route
          path={route.path}
          Component={route.Component}
          exact={route.exact}
          key={route.path}
        />
      ))}
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route
          path={route.path}
          Component={route.Component}
          exact={route.exact}
          key={route.path}
        />
      ))}
    </Routes>
  )
}

export default AppRouter
