import React, {useRef, useCallback, useState} from 'react';
import {Card, Form, Button, Alert} from 'react-bootstrap';
import {useAuth} from '../context/AuthContext';
import {Link, useHistory} from 'react-router-dom';

const Login = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const {login} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = useCallback(async(e) => {
        e.preventDefault();

        try{
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push('/');
            
        } catch {
            setError('Failed to Sign in!!');
        }finally{
            setLoading(false);
        }
        
        }, [login,history,setError]);

    return (
        <>
          <Card>
              <Card.Body>
                <h2 className='text-center mb-4'>Log In</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group id='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' ref={emailRef} required/>
                  </Form.Group>
                  <Form.Group id='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' ref={passwordRef} required/>
                  </Form.Group>
                <Button className='w-100' variant='info' type='submit' disabled={loading}>Log In</Button>
              </Form>
              <Button className="googleBtn w-100 text-center mt-2" variant='trasparent'>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                        alt="logo"
                    />
                    Login With Google
                </Button>
              <div className='w-100 text-center mt-2'>
                 <Link to='/forgot-password'>Forgot password?</Link>
                </div> 
              </Card.Body>
          </Card>
          <div className='w-100 text-center mt-2'>
              Don't have an account ? <Link to='/signup'>Sign Up</Link>
         </div>  
        </>
    )
}

export default Login;
