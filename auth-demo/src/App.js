import { Container } from 'react-bootstrap';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { AuthProvider } from './context/AuthContext';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './components/ForgotPassword';
import UpdateProfile from './components/UpdateProfile';

import './App.css';

const App = () => {
  return (
       <Container 
        className='d-flex align-items-center justify-content-center' 
        style={{minHeight:'100vh'}}
      >
        <div className='w-100' style={{maxWidth:'400px'}}>
         <Router>
            <AuthProvider>
              <Switch>
                <PrivateRoute exact path='/' component={Dashboard}/>
                <Route path='/signup' component={SignUp}/>
                <Route path='/login' component={Login}/>
                <Route path='/forgot-password' component={ForgotPassword}/>
                <PrivateRoute path='/update-profile' component={UpdateProfile}/>
              </Switch>
            </AuthProvider>
         </Router>
        </div>
    </Container>
  );
}

export default App;
