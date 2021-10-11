import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../queries';
import './LoginForm.css';

const LoginForm = ({ setToken, setNotification }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [getUser, userResult] = useLazyQuery(ME);
    const [login, result] = useMutation(LOGIN, {
        onError: () => {
            setNotification(`Username/password is not valid`, 5);
        },
        onCompleted: () => {
            setNotification(`Logged in successfully!`, 5);
        }
    });

    // console.log('result: ', result);
    // console.log('userResult: ', userResult);

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value;
            setToken(token);
            localStorage.setItem('library-user-token', token);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result.data]);

    const validateInput = input => {
        if (input === '') {
            return false;
        }
        return true;
    };

    const submit = async e => {
        e.preventDefault();
        if (!validateInput(username) || !validateInput(password)) {
            setNotification('Username/password is not valid', 5);
        } else {
            login({ variables: { username, password } });
        }

        setUsername('');
        setPassword('');
    };

    return (
        <div className='login'>
            <form onSubmit={submit} className='login-form'>
                username
                <input
                    className='login-form__username'
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                />
                password
                <input
                    className='login-form__password'
                    type='password'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
                <button className='login-form__button' type='submit'>
                    login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
