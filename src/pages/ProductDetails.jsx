import React, { useState } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import './ProductDetails.css'
import { Container, Flex, Grid, Image, Text, Box ,Button} from '@mantine/core'
import { useSearchParams } from 'react-router-dom'
import { useProduct } from '../hooks/useProduct'
import { useMediaQuery } from '@mantine/hooks'
import { useCounter } from '@mantine/hooks'
import { IconShoppingCart } from '@tabler/icons-react'
import { getUserIdFromToken } from '../utils/userId'


const ProductDetails = () => {
    const [searchParams] = useSearchParams();
    const productId = searchParams.get('id')
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedSize, setSelectedSize] = useState(null);
    const [count , handler] = useCounter(0 , {min : 0 , max : 5});
    const smallScreen = useMediaQuery('(max-width : 992px)')

    const { data: product, isLoading, isError } = useProduct(productId);
    
    if (isLoading) {
        return <Text>Loading product Details</Text>
    }
    if (isError) {
        return <Text>Error fetching product</Text>
    }
    const productImages = product ? Object.keys(product)
        .filter((key) => key.startsWith('image'))
        .map((key) => product[key]) : [];

    if (!selectedImage && productImages.length > 0) {
        setSelectedImage(productImages[0])
    }

    const handleAddToCart =() =>{
        const userId = getUserIdFromToken();
        if (!userId){
            alert("You must be logged in to add items to the cart")
            return;
    }
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    const userCart = cart[userId] || [];

    //Check the product with same size is alreadyy in the cart

    const existingItem = userCart.findIndex(
        (item) => item.productId === product.id && item.size === selectedImage.size
    );

    if(existingItem >= 0){
        userCart[existingItem].quantity += count;
    }else{
        userCart.push({
            productId : product.id ,
            name :product.name , 
            price :product.price ,
            size : selectedSize , 
            image : selectedImage , 
            quantity : count ,
        });
    }

    cart[userId] = userCart;
    localStorage.setItem('cart' , JSON.stringify(cart));
    alert('Item added to cart');
    setSelectedSize(null);
    handler.set(0);
    };

    const sizeBox = ['S' , 'M' , 'L' , 'XL']

    
    return (
        <>
            <Header />
            <Container fluid p={smallScreen ? 20 : 60}>
                <Grid columns={12}>
                    <Grid.Col span={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                        <Box hiddenFrom='md'>
                            <Text size='md' className='productDetailsCategory'>
                                {product?.gender}'s  {product?.category}
                            </Text>
                            <Text className='productDetailsName'>
                                {product?.name}
                            </Text>
                        </Box>
                        <Image src={selectedImage} alt={product?.name || 'product Image'} className='gallaryMain' />
                        <Flex mt='md' gap='xs' direction='row'>
                            {productImages.map((image, index) => (
                                <Image
                                    className='gallaryThumpnail'
                                    key={index}
                                    src={image}
                                    radius='sm'
                                    style={{
                                        cursor: 'pointer',
                                        border: selectedImage === image ? '2px solid var(--primary-color-1)' : 'none',
                                    }}
                                    onClick={() => setSelectedImage(image)}
                                />
                            ))}
                        </Flex>
                    </Grid.Col>
                    <Grid.Col span={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                        <Box visibleFrom='md'>
                            <Text size='md' className='productDetailsCategory'>
                                {product?.gender}'s {product?.category}
                            </Text>
                            <Text className='productDetailsName'>
                                {product?.name}
                            </Text>
                        </Box>
                        <Text className='productDetailsPrice'>
                            INR {product?.price}
                        </Text>
                        <Text className='productDetailsDescription'>
                            {product?.details}
                        </Text>

                        <Flex gap='sm' wrap='wrap' mt={30}>
                            {sizeBox.map((size) => (
                                <Box
                                    key={size}
                                    className={`sizeSelector ${selectedSize === size ? 'selected' : ''}`}
                                    onClick={() => setSelectedSize(size)}>
                                    <Text className='sizeSelectorText'>{size}</Text>
                                </Box>
                            ))}
                        </Flex>

                        <Flex direction='row' mt={30}>
                            <Flex direction='row' className='counterSection'>
                                <Button onClick={handler.decrement} className='itemCountButton'>-</Button>
                                <Text className='itemCountText'>{count}</Text>
                                <Button onClick={handler.increment} className='itemCountButton'>+</Button>
                            </Flex>
                            <Button 
                                className='addToCartButton' 
                                rightSection={<IconShoppingCart />}
                                onClick={handleAddToCart}
                                disabled = {!selectedSize || count === 0}>
                                    ADD TO CART
                            </Button>
                        </Flex>

                    </Grid.Col>
                </Grid>
            </Container>
            <Footer />
        </>
    )
}

export default ProductDetails;

