import React from 'react'
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './LoginRight.css'
import {
  Title,
  TextInput,
  PasswordInput,
  Button,
  Anchor,
  Stack,
  Checkbox,
} from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { useForm } from '@mantine/form'
import { IconMail, IconLock, IconUser } from '@tabler/icons-react';
import {  LoginFormValues , RegisterFormValue } from '../interface/loginInterface';

const LoginRight = () => {
  const [type, toggle] = useToggle(['login', 'register'] as const);
  const  {login , register  , user} = useAuth()
  const navigate = useNavigate();
  
  const loginForm = useForm<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length < 6 ? 'Password should include at least 6 characters' : null),
    }
  });
  const registerForm = useForm<RegisterFormValue>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      terms: false,
    },

    validate: {
      name: (val) => (val.length < 3 ? 'Name must be at least 3 characters' : null),
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length < 6 ? 'Password must be at least 6 characters' : null,
      terms: (val) => (val ? null : 'You must accept the terms'),
    }
  });

  const handleLogin = async (values : LoginFormValues ) => {
    login(values.email , values.password)
    navigate('/');
  };

  const handleRegistration = async (values : RegisterFormValue) => {
        register(values.email , values.name , values.password , values.terms);
        registerForm.reset();
        toggle();
    };

  return (

    <div className='loginForm'>
      {type === 'login' ? (
        <form onSubmit={loginForm.onSubmit(handleLogin)} className='formlog'>
          <Stack>
            <Title order={1}
              className='loginRightText'>
              SIGN IN
            </Title>
            <TextInput
              required
              value={loginForm.values.email}
              leftSection={<IconMail size='1rem' color='#3E3E3E' />}
              label="Sign in with email address"
              {...loginForm.getInputProps('email')}
              error={loginForm.errors.email && 'Invalid email'}
              placeholder='Enter your email'
            />
            <PasswordInput
              required
              leftSection={<IconLock size='1rem' color='#3E3E3E' />}
              label="Password"
              {...loginForm.getInputProps('password')}
              error={loginForm.errors.password && 'Password should include at least 6 characters'}
              placeholder='Enter your password'
            />
            
            <Button type='submit'>LOGIN</Button>
          </Stack>
        </form>) : (
        <form onSubmit={registerForm.onSubmit(handleRegistration)}>
          <Stack>
            <Title order={1}
              className='loginRightText'>
              REGISTER
            </Title>
            <TextInput
              required
              leftSection={<IconUser size='1rem' color='#3E3E3E' />}
              label="Full Name"
              {...registerForm.getInputProps('name')}
              placeholder='Enter your name'
            />
            <TextInput
              required
              leftSection={<IconMail size='1rem' color='#3E3E3E' />}
              label="Email address"
              {...registerForm.getInputProps('email')}
              error={registerForm.errors.email && 'Invalid email'}
              placeholder='Enter your email'
            />
            <PasswordInput
              required
              leftSection={<IconLock size='1rem' color='#3E3E3E' />}
              label="Password"
              {...registerForm.getInputProps('password')}
              error={registerForm.errors.password && 'Password should include at least 6 characters'}
              placeholder='Enter your password'
            />
            <Checkbox
              label="I accept the terms and conditions"
              {...registerForm.getInputProps('terms', { type: 'checkbox' })}
            />
            <Button type='submit'>SIGN UP</Button>
          </Stack>
        </form>)}
      <Anchor type="Button" onClick={() => toggle()}>
        {type === 'register'
          ? 'Already have an account ? Login' : "Don't have an account ? Register"
        }
      </Anchor>
    </div>
  )
}

export default LoginRight

