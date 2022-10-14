import { useEffect, useState, useRef } from "react"
import {db} from '../firebase/config'


const useCollection = (collection, _query, _orderBy) => {
    const [documents, setDocuments] = useState([])
    const [error, setError] = useState(null)
    
    //! if we don't use a ref --> infinite loop in useEffect
    //! _query is an array and is "different" on every function call
    const query = useRef(_query).current
    const orderBy = useRef(_orderBy).current
  
    useEffect(() => {
        let currentCollection = db.collection(collection)

        if (query) {
          currentCollection = currentCollection.where(...query)
        }
        if (orderBy) {
          currentCollection = currentCollection.orderBy(...orderBy)
        }

        const unsubscribe = currentCollection.onSnapshot((snapshot) => {
          let results = []
          snapshot.docs.forEach(doc => {
            results.push({id: doc.id, ...doc.data()})
          });

          setDocuments(results)
          setError(null)
        }, (error) => {
            console.log(error)
            setError('could not fetch the data')
        })
          
        //* unsubscribe on unmount
        return () => unsubscribe()
    },[collection,query,orderBy])
    
    
    return { documents, error }
}

export default useCollection