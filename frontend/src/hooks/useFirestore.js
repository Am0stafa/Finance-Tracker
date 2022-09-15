import { createContext, useReducer, useEffect } from 'react'
import {db,timestamp} from '../firebase/config'
//! this hook is used to do two things 
//& add new document to a collection 
//& remove document from a collection

//! represents the response we get from firebase
let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}
  
const firestoreReducer = (state, action) => {
    switch (action.type) {
      case 'IS_PENDING':
        return { isPending: true, document: null, success: false, error: null }
      case 'ADDED_DOCUMENT':
        return { isPending: false, document: action.payload, success: true, error: null }
      case 'DELETED_DOCUMENT':
        return { isPending: false, document: null, success: true, error: null }
      case 'ERROR':
        return { isPending: false, document: null, success: false, error: action.payload }
      default:
        return state
    }
  }

const useFirestore = (collection) => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [response,dispatch] =  useReducer(firestoreReducer, initialState)
    
      //! only dispatch is not cancelled
    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
          dispatch(action)
        }
    }
    //! get the collection
    const currentCollection = db.collection(collection)
    

    
    const addDocument = async (data) => {
        dispatch({ type: 'IS_PENDING' })
        try {
            const addedDocument = await currentCollection.add({...data});
            dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })

        } catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
        }
    
    }
    
    const deleteDocument = async (id) => {
        dispatch({ type: 'IS_PENDING' })
        try {
            
        } catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: 'could not delete' })
        }
    
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])


    return { addDocument, deleteDocument, response }

}

export default useFirestore