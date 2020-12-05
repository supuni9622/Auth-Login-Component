import React, {useRef, useCallback, useState} from 'react';
import {Card, Form, Button, Alert} from 'react-bootstrap';
import {useAuth} from '../context/AuthContext';
import {Link, useHistory} from 'react-router-dom';

const UpdateProfile = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {currentUser, updateEmail, updatePassword} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        setError('');
        setLoading(true);

        // Validations
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords don not match!!');
        }

        const promises = [];

        if(emailRef.current.value !== currentUser.email){
            promises.push(updateEmail(emailRef.current.value));
        }
        if(passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value));
        }

        Promise.all(promises).then (()=> {
            history.push('/');
        }).catch(()=> {
            setError("Failed to update profile!!!");
        }).finally(()=> {
            setLoading(false);
        });
        
        }, [history,setError,updateEmail,updatePassword,currentUser.email]);

    return (
        <>
          <Card>
              <Card.Body>
                <h2 className='text-center mb-4'>Update Profile</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group id='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' ref={emailRef} defaultValue={currentUser.email}/>
                  </Form.Group>
                  <Form.Group id='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' ref={passwordRef} placeholder='Leave blank to keep the same'/>
                  </Form.Group>
                  <Form.Group id='password-confirm'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' ref={passwordConfirmRef} placeholder='Leave blank to keep the same'/>
                  </Form.Group>
                <Button className='w-100' variant='info' type='submit' disabled={loading}>Update Profile</Button>
              </Form>
              </Card.Body>
          </Card>
          <div className='w-100 text-center mt-2'>
            <Link to='/'>Cancel</Link>
         </div>  
        </>
    )
}


export default UpdateProfile
