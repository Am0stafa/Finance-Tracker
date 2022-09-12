import { createContext, useReducer} from "react";

const init ={ 
    user: null,
    authIsReady: false
}

export const authReducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN':
        return { ...state, user: action.payload }
      case 'LOGOUT':
        return { ...state, user: null }
      case 'AUTH_IS_READY':
        return { user: action.payload, authIsReady: true }
      default:
        return state
    }
  }

export const AuthContext = createContext(init);

export const AuthProvider = ({children})=>{
    const [state,dispatch] = useReducer(authReducer,init)
    
    console.log('AuthContext state:', state)
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )

}