import React from 'react'
import { Link } from "react-router-dom"
import styles from './Navbar.module.css'
import useAuthcontext from '../hooks/useAuthcontext'
import useLogout from '../hooks/useLogout'

const Navbar = () => {
  const {user} = useAuthcontext()
  const {logout} = useLogout()

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}><Link to="/">My money</Link></li>
    
    {!user && (
      <>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
      </>
    )}
    

       
      {user && (
          <>
            <li>hello, {user?.displayName}</li>
            <li>
              <button className="btn" onClick={logout}>Logout</button>
            </li>
          </>
        )}
      
      </ul>
    </nav>
  )
}

export default Navbar