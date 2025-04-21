import '@mantine/core/styles.css';
import './App.css'
import { MantineProvider  } from '@mantine/core';
import { Router } from './Router';
import '@mantine/notifications/styles.css'
import { Notifications } from '@mantine/notifications';


export default function App() {
  return (
  
    <MantineProvider>
        <Notifications />
        <Router />
    </MantineProvider>
  
  );
}
