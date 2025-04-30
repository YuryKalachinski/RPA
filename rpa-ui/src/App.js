import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import Navbar from './components/ui/navbar/Navbar'
import { AuthContext } from './context'

function App() {
  const [host, setHost] = useState(null)

  return (
    <AuthContext.Provider value={{ host, setHost }}>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
