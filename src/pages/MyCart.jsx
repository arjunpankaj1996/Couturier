import React, { useState , useEffect } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { useMediaQuery } from '@mantine/hooks'
import { Container, Flex, Grid , Text , Image, Box , Button , Divider} from '@mantine/core'
import './MyCart.css'
import { IconTrash ,IconArrowRight} from '@tabler/icons-react'
import { getUserIdFromToken } from '../utils/userId'
import { useNavigate } from 'react-router-dom'


const MyCart = () => {
  
  const [cartItems , setCartItems] = useState([]);
  const smallScreen = useMediaQuery('(max-width : 992px)');
  const navigate = useNavigate();
  const userId = getUserIdFromToken();

  useEffect (() =>{
    const storedCart = JSON.parse(localStorage.getItem('cart')) || {}
    if (userId && storedCart[userId]){
      setCartItems(storedCart[userId]);
    }
  },[userId]);

  const updateLocalStorage = (updatedCart) =>{
    const storedCart = JSON.parse(localStorage.getItem('cart')) || {}
    storedCart[userId] = updatedCart;
    localStorage.setItem('cart' , JSON.stringify(storedCart));
    setCartItems(updatedCart);
  };
  
  const handleDelete = (productId , size) =>{
    const updatedCart = cartItems.filter((item) =>
       !(item.productId === productId && item.size === size )
    )
    updateLocalStorage(updatedCart);
  };  

  const handleQuantityChange = (productId , size , x) => {
      const updatedCart = cartItems.map((item) =>{
        if(item.productId === productId && item.size === size){
          return {...item ,quantity: Math.max(1 ,item.quantity + x)}
        }
        return item;
      })
      updateLocalStorage(updatedCart)
  };

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
    <>
      <Header />
        <Container fluid p={smallScreen ? 20 : 60}>
          <Text className='cartHead'>CART</Text>
          <Grid columns={12}>
            <Grid.Col span={{xs : 12 , sm : 12 , md : 7 , lg : 7}}>
            {cartItems.length === 0 ?(<Text>Your cart is empty</Text>) :  (
              cartItems.map((item) =>(
            <React.Fragment key={`${item.productId}-${item.size}`}>
              <Flex w='100%'>
                <Image src={item.image} className='cartImage'></Image>
                <Box ml={15} style={{flex :1}}>
                  <Text className='cartItemName'>{item.name} </Text>
                  <Text className='cartItemPrice'>INR {item.price}</Text>
                  <Text className='cartItemPrice'>Size : {item.size}</Text>
                  <Flex  direction={smallScreen ? 'column' : 'row'} mt={smallScreen ? 15 : 25}>
                    <Flex direction='row' className='cartCounterSection'>
                        <Button  className='cartItemCountButton'
                                onClick={()=>handleQuantityChange(item.productId , item.size , -1)}>-</Button>
                        <Text className='cartItemCountText'>{item.quantity}</Text>
                        <Button  className='cartItemCountButton'
                                onClick={()=>handleQuantityChange(item.productId , item.size , 1)}>+</Button>
                    </Flex>
                    <Button leftSection={<IconTrash stroke={2} />} 
                            className='cartDeleteButton' 
                            p={0}
                            onClick={()=>handleDelete(item.productId , item.size)}
                            >Delete
                    </Button>
                  </Flex>
                </Box>
              </Flex>
              <Divider my={30}
                        style={{
                          borderTop: '2px solid #ccc', 
                          opacity: 0.8,               
                        }} />
             </React.Fragment>
                      ))
                    )}
            </Grid.Col>
            <Grid.Col span={{xs : 12 , sm : 12 , md : 5 , lg : 5}}>
              <Box px={30}>
                <Text className='checkoutHeading'>order summary</Text>
                <Flex justify='space-between'>
                  <Text className='orderSummaryText'>Subtotal</Text>
                  <Text>₹ {calculateSubtotal(cartItems).toFixed(2)}</Text>
                </Flex>
                <Flex justify='space-between'>
                  <Text className='orderSummaryText'>GST (12%)</Text>
                  <Text>₹ {calculateGST(calculateSubtotal(cartItems)).toFixed(2)}</Text>
                </Flex>
                <Flex justify='space-between'>
                  <Text className='orderSummaryText'>Delivery Charge</Text>
                  <Text>₹ 30</Text>
                </Flex>
                <Divider my={20} />
                <Flex justify='space-between'>
                  <Text className='orderSummaryTotal'>Total</Text>
                  <Text className='orderSummaryTotal'>₹ {calculateTotal(
                          calculateSubtotal(cartItems),
                          calculateGST(calculateSubtotal(cartItems))).toFixed(2)}
                  </Text>
                </Flex>
                <Button className='buttonCheckout'onClick={()=>navigate('/Checkout')} rightSection={<IconArrowRight stroke={2}/>}>PROCEED TO CHECKOUT</Button>
              </Box>
              
            </Grid.Col>
          </Grid>
        </Container>
      <Footer />
    </>
  )
}

export default MyCart