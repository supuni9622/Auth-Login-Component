import React, {useRef, useCallback, useState} from 'react';
import {Card, Form, Button, Alert} from 'react-bootstrap';
import {useAuth} from '../context/AuthContext';

const SignUp = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {signUp, currentUser} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = useCallback(async(e) => {
        e.preventDefault();

        // Validations
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords don not match!!');
        }
        if(passwordRef.current.value.length < 6 ){
            return setError('Password should have at least 6 characters!!');
        }

        try{
            setError('');
            setLoading(true);
            await signUp(emailRef.current.value, passwordRef.current.value);
            
        } catch {
            setError('Failed to create an account!!');
        }finally{
            setLoading(false);
        }
        
        }, [signUp]);

    return (
        <>
          <Card>
              <Card.Body>
                <h2 className='text-center mb-4'>Sign Up</h2>
                {/* {JSON.stringify(currentUser)} */}
                {currentUser && <Alert variant='success'>{currentUser.email} signup successfully!!</Alert>}
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
                  <Form.Group id='password-confirm'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' ref={passwordConfirmRef} required/>
                  </Form.Group>
                <Button className='w-100' variant='info' type='submit' disabled={loading}>Sign Up</Button>
              </Form>
              </Card.Body>
          </Card>
          <div className='w-100 text-center mt-2'>
              Already have an account ? Log In
         </div>  
        </>
    )
}

export default SignUp
