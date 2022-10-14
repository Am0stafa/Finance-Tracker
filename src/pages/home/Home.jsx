import React from 'react'
import styles from './Home.module.css'
import TransactionForm from '../../components/TransactionForm'
import useAuthcontext from '../../hooks/useAuthcontext'
import TransactionList from './TransactionList'
import useCollection from '../../hooks/useCollection'

const Home = () => {
  const {user} = useAuthcontext()
  const { documents, error } = useCollection('transactions', ["uid", "==", user.uid],['createdAt', 'desc'])
  console.log(documents)

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && <TransactionList transactions={documents}/>}
      </div>
      <div className={styles.sidebar}>
       <TransactionForm uid={user.uid}/>
      </div>
    </div>
  )
}

export default Home