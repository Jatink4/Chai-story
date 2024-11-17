import React from 'react'
import {Container,Logo,LogoutBtn} from './index'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDarkMode } from '../DarkModeContext'

function Header() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
  const authStatus=useSelector((state)=>state.auth.status)
  const navigate=useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]


  return (
    <header className='py-3 shadow bg-pink-200 dark:bg-gray-900 '>
    <Container>
      <nav className='flex'>
        <div className='mr-4'>
          <Link to='/'>
            <Logo width='70px'   />

            </Link>
        </div>
        <ul className='flex ml-auto'>
          {navItems.map((item) => 
          item.active ? (
            <li key={item.name}>
              <button
              onClick={() => navigate(item.slug)}
              className='inline-bock px-6 py-2 duration-200 hover:bg-blue-600 rounded-full text-black dark:text-white'
              >{item.name}</button>
            </li>
          ) : null
          )}
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
        <button
          onClick={toggleDarkMode}
          className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? '🌞' : '🌙'}
        </button>
      </nav>
      </Container>
  </header>
  )
}

export default Header
