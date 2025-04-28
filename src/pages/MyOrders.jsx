import React from 'react'
import './MyOrders.css'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { useMediaQuery } from '@mantine/hooks'
import { Container , Box, Image, Text, Divider, Flex} from '@mantine/core'
import { useOrders } from '../hooks/useOrders'

const MyOrders = () => {
    const { orders , isLoading , isError} = useOrders();
    const smallScreen = useMediaQuery('(max-width : 992px)');
    
    if(isLoading){
       return <Text>Loading Order details</Text>
    }
    if(isError){
        return <Text>Error on fetching order details</Text>
    }
  return (
    <>
        <Header/>
        <Container fluid px={smallScreen ? 10 : 60} pt={15}>
            <Text className='orderHead'>MY ORDERS</Text>
                {orders.length === 0 ?(
                    <Text>No orders found.Start shopping!</Text>
                ) : (
                orders.map((order) =>(
                    <Box key={order.id} >
                        <Box className='orderHeadingSection'>
                            <Text className='orderSectionOrderId'>Order Id : {order.id}</Text>
                            <Text className='orderSectionPaymentId'>Payment Id :{order.paymentid}</Text>
                        </Box>
                        {order.product.map((item , index) =>(
                            <Flex key={index}>
                                <Image src ={item.image} w={150} h={150} my={10}/>
                                <Box>
                                    <Text className='orderItemName'>{item.name}</Text>
                                    <Text>Size :{item.size}</Text>
                                    <Text>Price : INR {item.price}</Text>
                                    <Text>Quantity : {item.quantity}</Text>
                                </Box>
                            </Flex>    
                        ))}
                        <Divider/>
                    </Box>
                )))
                }
        </Container>
        <Footer/>
    </>
  )
}

export default MyOrders