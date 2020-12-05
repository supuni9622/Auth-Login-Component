import React, {useRef, useCallback, useState} from 'react';
import {Card, Form, Button, Alert} from 'react-bootstrap';
import {useAuth} from '../context/AuthContext';
import {Link} from 'react-router-dom';

const ForgotPassword = () => {

    const emailRef = useRef();
    const {resetPassword} = useAuth();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // We can use tempory emails to check this --> https://temp-mail.org/en/

    const handleSubmit = useCallback(async(e) => {
        e.preventDefault();

        try{
            setMessage('');
            setError('');
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage('Check you inbox for further instructions!!');
            
        } catch {
            setError('Failed to reset password!!');
        }finally{
            setLoading(false);
        }
        
        }, [setError,setMessage]);

    return (
        <>
          <Card>
              <Card.Body>
                <h2 className='text-center mb-4'>Reset Password</h2>
                {message && <Alert variant='success'>{message}</Alert>}
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group id='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' ref={emailRef} required/>
                  </Form.Group>
                <Button className='w-100' variant='info' type='submit' disabled={loading}>Reset Password</Button>
              </Form>
              <div className='w-100 text-center mt-2'>
                 <Link to='/login'>Login</Link>
                </div> 
              </Card.Body>
          </Card>
          <div className='w-100 text-center mt-2'>
              Don't have an account ? <Link to='/signup'>Sign Up</Link>
         </div>  
        </>
    )
}

export default ForgotPassword;
