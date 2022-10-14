import React, { useState } from 'react'
import styles from './Login.module.css'
import {useLogin} from '../../hooks/useLogin'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
   const{ login, isPending, error }= useLogin()
   const handleSubmit = (e) => {
      e.preventDefault()
      login(email, password)
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
        { !isPending && <button className="btn">Login</button> }
        { isPending && <button className="btn" disabled>loading</button> }
        { error && <p>{error}</p> }

      </form>
    )
}

export default Login