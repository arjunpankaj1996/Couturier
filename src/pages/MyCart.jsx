import React from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { useMediaQuery , useCounter} from '@mantine/hooks'
import { Container, Flex, Grid , Text , Image, Box , Button , Divider} from '@mantine/core'
import './MyCart.css'
import image from '../assets/bannercard.png'
import { IconTrash } from '@tabler/icons-react'


const MyCart = () => {
  const [count , handler] = useCounter(0 , {min : 0 , max : 5})
  const smallScreen = useMediaQuery('(max-width : 992px)')
  return (
    <>
      <Header />
        <Container fluid p={smallScreen ? 20 : 60}>
          <Text className='cartHead'>CART</Text>
          <Grid columns={12}>
            <Grid.Col span={{xs : 12 , sm : 12 , md : 7 , lg : 7}}>

              <Flex w='100%'>
                <Image src={image} w={150} h={150}></Image>
                <Box ml={15} style={{flex :1}}>
                  <Text className='cartItemName'>Product Name</Text>
                  <Text className='cartItemPrice'>INR 00.00</Text>
                  <Flex  direction={smallScreen ? 'column' : 'row'} mt={smallScreen ? 15 : 50}>
                    <Flex direction='row' className='cartCounterSection'>
                        <Button onClick={handler.decrement} className='cartItemCountButton'>-</Button>
                        <Text className='cartItemCountText'>{count}</Text>
                        <Button onClick={handler.increment} className='cartItemCountButton'>+</Button>
                    </Flex>
                    <Button leftSection={<IconTrash stroke={2} />} 
                            className='cartDeleteButton' 
                            p={0}
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

            </Grid.Col>
            <Grid.Col span={{xs : 12 , sm : 12 , md : 5 , lg : 5}}>
              
            </Grid.Col>
          </Grid>
        </Container>
      <Footer />
    </>
  )
}

export default MyCart