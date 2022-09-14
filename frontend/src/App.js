
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import useAuthcontext from './hooks/useAuthcontext'



import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Navbar from './components/Navbar.jsx'

function App() {
  const {user,authIsReady} = useAuthcontext()

  return (
    <div className="App">
{      authIsReady &&( <BrowserRouter>
        <Navbar />
          <Switch>
          
            <Route exact path="/">
              <Home />
            </Route>
            
            <Route exact path="/login">
              <Login />
            </Route>
            
            <Route exact path="/signup">
              <Signup />
            </Route>
            
          </Switch>
      </BrowserRouter>)}
    </div>
  );
}

export default App
