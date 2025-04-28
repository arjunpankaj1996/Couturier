import React from 'react'
import { Container , Text ,Box, Button} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks';
import './PaymentSuccess.css'
import { IconRosetteDiscountCheckFilled } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const smallScreen = useMediaQuery('(max-width : 992px)');
  return (
    <Container fluid px={smallScreen ? 10 : 60} pt={15} className='successContainer'>
        <Text className='successHeading'><span>C</span>OUTURIER</Text>
        <Box className='successBox'>
            <center><IconRosetteDiscountCheckFilled className='successIcon'/></center>
            <Text className='paymentSuccessHeading'>Payment Success</Text>
            <Text className='paymentSuccessText'>Lean back and relax, knowing our team is hard at work preparing and shipping your package swiftly. Feel free to browse our diverse product selection during this time – you might discover another item you'd like to add to your collection!</Text>
            <Button className='buttonMain' onClick={()=>navigate('/')} mt={30} w={250}>Back To Home</Button>
        </Box>
    </Container>
  )
}

export default PaymentSuccess