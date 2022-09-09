import React, { useState } from 'react'
import styles from './Signup.module.css'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')

    const handleSubmit = (e) => {
      e.preventDefault()

    }
  
    return (
      <form onSubmit={handleSubmit} className={styles['signup-form']}>
        <h2>sign up</h2>
        <label>
          <span>email:</span>
        </label>
          <input 
            type="email" 
            onChange={(e) => setEmail(e.target.value)} 
            value={email}
           />
        
        <label>
          <span>password:</span>
        </label>
          <input 
            type="password" 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
          />
        <label>
          <span>display name:</span>
          <input 
            type="text" 
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
        </label>

      </form>
    )
}

export default Signup