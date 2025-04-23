import React, {useState , useEffect} from 'react'
import './Checkout.css'
import { useForm } from '@mantine/form';
import { Grid, Text ,Container , Stepper, TextInput, Textarea , Button, Flex ,Image , Box ,Paper, Divider} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { getUserIdFromToken } from '../utils/userId';

const Checkout = () => {
    const smallScreen = useMediaQuery('(max-width : 992px)');
    const [active , setActive] = useState(0);
    const [cartItems , setCartItems] = useState([]);
    const userId = getUserIdFromToken();

    useEffect (() =>{
        const storedCart = JSON.parse(localStorage.getItem('cart')) || {}
        if (userId && storedCart[userId]){
          setCartItems(storedCart[userId]);
        }
      },[userId]);

    
      
    const form = useForm({
        initialValues :{
            name : '',
            email : '',
            phone : '',
            address : '',
            pin :'',
        },
        validate: {
            name: (value) => (value.length < 2 ? 'Name too short' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            address: (value) => (value.length < 5 ? 'Address too short' : null),
          },
    })


    const nextStep = () =>
        setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => 
        setActive((current) => (current > 0 ? current - 1 : current));

    const calculateSubtotal = (cartItems) => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      };
      
      const calculateGST = (subtotal) => {
        return subtotal * 0.12;
      };
      
      const calculateTotal = (subtotal, gst, deliveryCharge = 30) => {
        return subtotal + gst + deliveryCharge;
      };
  
  return (
    <Container fluid px={smallScreen ? 10 : 60} pt={15}>
        <Grid columns={12}>
            <Grid.Col span={{xs:12 , sm :12 , md : 7 , lg : 7}}>
                <Text className='checkoutHeading'><span>C</span>OUTURIER</Text>
                <Text className='checkoutHeadMain'>CHECKOUT FORM</Text>
                <Stepper active={active} onStepClick={setActive} mt={40} allowNextStepsSelect={true}>
                    <Stepper.Step label='Step 1' description='Personal Info' className='checkoutStepperStep'>
                        <form onSubmit={form.onSubmit()}className='checkoutInput'>
                            <TextInput
                            required
                            label='Name :'
                            placeholder='Your name...'
                            {...form.getInputProps('name')} />
                            <TextInput
                            required
                            type='email'
                            label='Email :'
                            placeholder='Your email...'
                            {...form.getInputProps('email')} />
                            <TextInput 
                            required
                            label='Phone No :'
                            placeholder='Your phone number...'
                            {...form.getInputProps('phone')}
                            type='number' />
                            <Textarea 
                            required
                            label='Address :'
                            placeholder='Your address...'
                            {...form.getInputProps('address')}/>
                            <TextInput 
                            required
                            label='Pin Code :'
                            placeholder='Your pin code...'
                            {...form.getInputProps('pin')}/>
                            <Button className='checkoutButton'onClick={nextStep} mt={15}>CONTINUE TO SHIPPING</Button>
                        </form>
                    </Stepper.Step>
                    <Stepper.Step label='Step 2' description='Payment' className='checkoutStepperStep'>
                        
                    </Stepper.Step>
                    <Stepper.Step label='Step 3' description='Confirmation' className='checkoutStepperStep'>
                        
                    </Stepper.Step>

                </Stepper>
            </Grid.Col>
            <Grid.Col span={{xs:12 , sm :12 , md : 5 , lg : 5}} >
                <Box className='checkoutOrderSummary'>
                    <Text className='checkoutOrderSummaryHead'>Order Summary</Text>
                    {cartItems.map((item) =>(
                    <Paper key={`${item.productId}-${item.size}`} mt={20}>
                        <Flex>
                            <Image className='checkoutImage' src={item.image}/>
                            <Box ml={10}>
                                <Text className='checkoutOrderSummaryName'>{item.name}</Text>
                                <Text className='checkoutOrderSummaryPrice'>{item.quantity} &nbsp; X  &nbsp;INR {item.price}</Text>
                            </Box>
                        </Flex>
                    </Paper>
                    ))}
                    <Divider my={20}
                        style={{
                            borderTop: '2px solid #ccc', 
                            opacity: 0.8,               
                            }}/>
                     <Box>
                        
                        <Flex justify='space-between'>
                        <Text className='checkoutOrderSummarySubtotal'>Subtotal</Text>
                        <Text>₹ {calculateSubtotal(cartItems).toFixed(2)}</Text>
                        </Flex>
                        <Flex justify='space-between'>
                        <Text className='checkoutOrderSummarySubtotal'>GST (12%)</Text>
                        <Text>₹ {calculateGST(calculateSubtotal(cartItems)).toFixed(2)}</Text>
                        </Flex>
                        <Flex justify='space-between'>
                        <Text className='checkoutOrderSummarySubtotal'>Delivery Charge</Text>
                        <Text>₹ 30</Text>
                        </Flex>
                        <Flex justify='space-between'>
                        <Text className='chechoutOrderSummaryTotal'>Total</Text>
                        <Text className='chechoutOrderSummaryTotal'>₹ {calculateTotal(
                                calculateSubtotal(cartItems),
                                calculateGST(calculateSubtotal(cartItems))).toFixed(2)}
                        </Text>
                        </Flex>
                         </Box>
                </Box>
            </Grid.Col>
        </Grid>
    </Container>
  )
}

export default Checkout