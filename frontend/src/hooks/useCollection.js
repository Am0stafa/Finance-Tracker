import { useEffect, useState, useRef } from "react"
import {db} from '../firebase/config'

//! this hook is all about subscribing to real time data for a collection
const useCollection = (collection, _query, _orderBy) => {
    const [documents, setDocuments] = useState([])
    const [error, setError] = useState(null)
    
    //! the reason why we are using that logic inside useEffect because we want this code to run right away as soon as the component mounts we dont need to call a function to grab the data rather get the data right away!!
    useEffect(() => {
        let currentCollection = db.collection(collection)
    
        //^ this function is going to fire a function for us whenever the firestore collection change
        const unsubscribe = currentCollection.onSnapshot((snapshot) => {
          let results = []
          snapshot.docs.forEach(doc => {
            results.push({id: doc.id, ...doc.data()})
          });
          // update state
          setDocuments(results)
          setError(null)
        }, (error) => {
            console.log(error)
            setError('could not fetch the data')
        })
          
        //* unsubscribe on unmount
        return () => unsubscribe()
    },[collection])//^ whenever that collection changes we are going to set up a new subscribing to that new collection
    
    
    return { documents, error }
}

export default useCollection