import React, { useState } from 'react'
import './Checkout.css'
import { useForm } from '@mantine/form';
import { Grid, Text, Container, Stepper, TextInput, Textarea, Button, Flex, Image, Box, Paper , Divider , List } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { loadRazorpay } from '../utils/razorpay';
import { calculateSubtotal , calculateGST , calculateTotal } from '../utils/checkoutCalculations';
import { useCart } from '../hooks/useCart';
import { usePlaceOrders } from '../hooks/usePlaceOrders';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const smallScreen = useMediaQuery('(max-width : 992px)');
    const [active, setActive] = useState(0);
    const { cartItems, userId , clearCart } = useCart();
    const [paymentId , setPaymentId] = useState('');
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            address: '',
            pin: '',
        },
        validate: {
            name: (value) => (value.length < 2 ? 'Name must be at least 2 characters long' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email address'),
            phone: (value) => (/^\d{10}$/.test(value) ? null : 'Phone number must be 10 digits'),
            address: (value) => (value.length < 5 ? 'Address must be at least 5 characters long' : null),
            pin: (value) => (/^\d{6}$/.test(value) ? null : 'Pin code must be 6 digits'),
        },
    })


    const nextStep = () =>{
        if (form.validate().hasErrors) {
            console.error("Form validation failed. Please fill all required fields correctly.");
            return;
        }
        setActive((current) => (current < 3 ? current + 1 : current));
    }

    const mutation = usePlaceOrders(()=>{ 
        nextStep()
    });

    const handlePayment = async () => {
        try {
            const subtotal = calculateSubtotal(cartItems);
            const gst = calculateGST(subtotal);
            const total = calculateTotal(subtotal, gst).toFixed(2);

            const razorpaypaymentId = await loadRazorpay(form.values, cartItems, total);


            if (razorpaypaymentId) {
                setPaymentId(razorpaypaymentId);
                mutation.mutate({
                    name: form.values.name,
                    email: form.values.email,
                    phone: form.values.phone,
                    address: form.values.address,
                    pincode: form.values.pin,
                    paymentid: razorpaypaymentId,
                    product: cartItems,
                    id: userId,
                });
            } else {
                console.error("Payment ID not returned.");
            }
        } catch (error) {
            console.error('Payment failed:', error);
        }
    };
    const handleFinish = () =>{
        navigate('/paymentSuccess')
        clearCart();
    }

    return (
        <Container fluid px={smallScreen ? 10 : 60} pt={15}>
            <Grid columns={12}>
                <Grid.Col span={{ xs: 12, sm: 12, md: 7, lg: 7 }}>
                    <Text className='checkoutHeading'><span>C</span>OUTURIER</Text>
                    <Text className='checkoutHeadMain'>CHECKOUT FORM</Text>
                    <Stepper active={active} onStepClick={setActive} mt={40} allowNextStepsSelect={false}>
                        <Stepper.Step label='Step 1' description='Personal Info' className='checkoutStepperStep'>
                            <form onSubmit={form.onSubmit(nextStep)} className='checkoutInput'>
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
                                    {...form.getInputProps('address')} />
                                <TextInput
                                    required
                                    label='Pin Code :'
                                    placeholder='Your pin code...'
                                    {...form.getInputProps('pin')} />
                                <Button className='checkoutButton' onClick={nextStep} mt={15}>CONTINUE TO SHIPPING</Button>
                            </form>
                        </Stepper.Step>
                        <Stepper.Step label='Step 2' description='Payment' className='checkoutStepperStep'>
                        <Box>
                            <Text className="checkoutInstructionHead" mb={10}>Instructions</Text>
                            <List spacing="sm" size="sm" className="checkoutInstructionList" type='ordered'>
                                <List.Item>
                                    <Text className="checkoutInstructionHead">Review Your Cart</Text>
                                    <Text className="checkoutInstructionText">Double-check the items, quantities, and total amount.</Text>
                                </List.Item>
                                <List.Item>
                                    <Text className="checkoutInstructionHead">Confirm Your Details</Text>
                                    <Text className="checkoutInstructionText">Ensure your shipping address, contact number, and email are correct.</Text>
                                </List.Item>
                                <List.Item>
                                    <Text className="checkoutInstructionHead">Don't Refresh or Close the Page</Text>
                                    <Text className="checkoutInstructionText">Once payment starts, don't refresh or close your browser/tab until it's complete.</Text>
                                </List.Item>
                            </List>
                        </Box>
                            <Button onClick={handlePayment} className='checkoutButton' mt={20}>
                                Continue to Payment </Button>
                        </Stepper.Step>
                        <Stepper.Step label='Step 3' description='Confirmation' className='checkoutStepperStep'>
                            <Text className='stepperPaymentIdHead'>Payment Id  &nbsp;</Text>
                            <Text className='stepperPaymentConfirmDetails'>{paymentId}</Text>
                            <Text className='stepperPaymentIdHead'>Payment Information</Text>
                            <Text className='stepperPaymentConfirmDetails'>Upon completing a purchase, you will receive a payment confirmation email. This email will contain essential information about the items you have purchased and the total amount that needs to be paid.</Text>
                            <Button className='checkoutButton' mt={30} onClick={handleFinish}>Finish</Button>
                        </Stepper.Step>

                    </Stepper>
                </Grid.Col>
                <Grid.Col span={{ xs: 12, sm: 12, md: 5, lg: 5 }} >
                    <Box className='checkoutOrderSummary'>
                        <Text className='checkoutOrderSummaryHead'>Order Summary</Text>
                        {cartItems.map((item) => (
                            <Paper key={`${item.productId}-${item.size}`} mt={20}>
                                <Flex>
                                    <Image className='checkoutImage' src={item.image} />
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
                            }} />
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