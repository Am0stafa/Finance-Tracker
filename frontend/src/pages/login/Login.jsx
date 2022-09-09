import React, { useState } from 'react'
import styles from './Login.module.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const handleSubmit = (e) => {
      e.preventDefault()

    }
  
    return (
      <form onSubmit={handleSubmit} className={styles['login-form']}>
        <h2>login</h2>
        <label>
          email:
        </label>
          <input 
            type="email" 
            onChange={(e) => setEmail(e.target.value)} 
            value={email}
          />
        
        <label>
          password:
        </label>
          <input 
            type="password" 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
          />
 
      </form>
    )
}

export default Login