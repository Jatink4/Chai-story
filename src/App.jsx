import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between dark:bg-gray-700 bg-sky-200 text-black dark:text-white'>
      <div className='w-full block'>
        <Header />
        <main>
        <h1>Chai & Stories: Where Every Sip Tells a Tale</h1><Outlet />
     </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App