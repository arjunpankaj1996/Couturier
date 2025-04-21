import React, { useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Card, Container, Grid, Box, Text, Image, Group, Anchor, Button } from '@mantine/core';
import './LandingPage.css';
import bannerCardImg from "../assets/bannercard.png";
import { IconChevronsDown, IconArrowRight , IconThumbUpFilled , IconPhoneFilled ,IconCreditCardFilled , IconTruckFilled} from '@tabler/icons-react';
import formalMen from "../assets/formalMen.png";
import formalWomen from "../assets/formalWomen.png";
import casual from "../assets/casual.png";
import '@mantine/carousel/styles.css';
import {Carousel} from "@mantine/carousel";
import { Rating } from '@mantine/core';
import { ProductCard } from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { useReviewsQuery } from '../hooks/useReviewsQuery';


export const LandingPage = () => {
const { data : products = [] , isLoading , isError } = useProducts();  
const { data : reviews = [] } = useReviewsQuery();

if (isLoading) {
  return <Text>Loading products...</Text>;
}

if (isError) {
  return <Text>Error fetching products. Please try again later.</Text>;
}


  return (
    <>
      <div className='bannerSection'>
        <Header insideLanding = {true}/>
        <Container fluid className="customContainer">
          <Grid columns={12}>
            <Grid.Col span={{ xs: 12, sm: 12, md: 8, lg: 8 }}>
              <Text className='bannerText' >
                MADE IN INDIA , DEDICATED TO INDIA
              </Text>
              <Text className='bannerTextMain'>
                DISCOVER THE ART OF <br />DRESSING UP
              </Text>
            </Grid.Col>
            <Grid.Col span={{ xs: 12, sm: 12, md: 4, lg: 4 }} className='bannerCardGrid'>
              <Card className='bannerCard'>
                <Group h={"100%"}>
                  <Card.Section component='a' href='#'>
                    <Image
                      h={200}
                      w="auto"
                      src={bannerCardImg} />
                  </Card.Section>
                  <div className="productDetailsLanding" style={{ marginRight: "17px" }}>
                    <Text className='bannerCardName'>Product Name<br /> in Here</Text>
                    <Text className='bannerCardPrice'>INR 500.00</Text>
                    <Anchor className="shopNowLinkBanner">SHOP NOW</Anchor>
                  </div>
                </Group>
              </Card>
              <Card className='bannerCard'>
                <Group h={"100%"}>
                  <div className="productDetailsLanding">
                    <Text className='bannerCardName'>Product Name<br /> in Here</Text>
                    <Text className='bannerCardPrice'>INR 500.00</Text>
                    <Anchor className="shopNowLinkBanner">SHOP NOW</Anchor>
                  </div>
                  <Card.Section component='a' href='#'>
                    <Image
                      ml={17}
                      h={200}
                      w="auto"
                      src={bannerCardImg}
                      sx={(theme) => ({
                        marginLeft: theme.breakpoints.md ? 0 : 17,
                      })} />
                  </Card.Section>
                </Group>
              </Card>
            </Grid.Col>
          </Grid>
          <Anchor className='scrollDownLink'onClick={()=>{
            document.getElementById("secondSection").scrollIntoView({behavior:"smooth"})
          }}>SCROLL DOWN<IconChevronsDown /></Anchor>
        </Container>
      </div>

      {/* ------------------------Second Section----------------------------- */}

      <Container fluid px={60} pt={40} pb={40} id="secondSection">
        <Grid columns={12} className='formalSectionGrid'>
          <Grid.Col span={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <Box className="formalBox">
              <Anchor href='#'>
                <Image src={formalMen} />
              </Anchor>
              <Text className='formalText'>FORMAL MEN</Text>
            </Box>
            <Box className="formalBox" mt={30}>
              <Anchor href='#'>
                <Image src={formalWomen} />
              </Anchor>
              <Text className='formalText'>FORMAL WOMEN</Text>
            </Box>
          </Grid.Col>
          <Grid.Col span={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <Box className='formalBox casualSection' h={'100%'}>
              <Anchor href='#'>
                <Image src={casual} h={'100%'} />
              </Anchor>
              <Text className='formalText'>CASUAL STYLE</Text>
            </Box>
          </Grid.Col>
        </Grid>
      </Container>

      {/* --------------------Women Product Section-------------------- */}

      <Container fluid px={60} pt={40} pb={40}>
        <Text className='productHead'>THE BEST DRESS FOR THE BEST WOMEN</Text>
        <Grid columns={12}>
          {products
            .filter((product) => product.gender === 'Women')
            .slice(0, 4)
            .map((product) => (
              <Grid.Col key={product.id} span={{ xs: 6, sm: 6, md: 3, lg: 3 }}>
                <ProductCard
                  id={product.id}
                  image={product.image1}
                  title={product.name}
                  gender={product.gender}
                  price={product.price}
                />
              </Grid.Col>
            ))}
        </Grid>
        <Button className='buttonMain' mt={20} w={150} h={50}>SEE MORE <IconArrowRight /></Button>
      </Container>


      {/*------------------------Best Outfits-------------------*/}

      <Container fluid px={60} pt={40} pb={40}>
        <Text className='productHead'> BEST OUTFIT FOR YOUR HAPPINESS</Text>
        <Grid columns={12}>
          {products
            .filter((product) => product.gender === 'Men')
            .slice(0, 4)
            .map((product) => (
              <Grid.Col key={product.id} span={{ xs: 6, sm: 6, md: 3, lg: 3 }}>
                <ProductCard
                  id={product.id}
                  image={product.image1}
                  title={product.name}
                  gender={product.gender}
                  price={product.price}
                />
              </Grid.Col>
            ))}
        </Grid>
        <Button className='buttonMain' mt={20} w={150} h={50}>SEE MORE <IconArrowRight /></Button>
      </Container>

      {/*------------------------Features Section-------------------*/}

    <Container fluid px={{base:10 , md:60 }} py={80} className='featureContainer'>
            <Grid columns={15}>
              <Grid.Col span={{xs:15 , sm:15 , md:4 , lg:4 }}>
                <Box className='featuresBox'>
                  <IconThumbUpFilled  className='featureBoxIcon'/>
                  <Text className='featureBoxHead'>100% Satisfaction Guarenteed</Text>
                  <Text className='featureBoxText'>Your happiness is our top priority. If for any reason you're not completely satisfied with your purchase or experience, we'll do everything we can to make it right—whether that means a replacement, a refund, or personalized support. We're here to ensure you feel confident and cared for, every step of the way.</Text>
                </Box>
              </Grid.Col>
              <Grid.Col span={{xs:15 , sm:15 , md:7 , lg:7 }}>
                <Box className='featuresBoxCenter'>
                  <IconPhoneFilled className='featureBoxIcon'/>
                  <Box>
                      <Text className='featureBoxHead'>24/7 Online Service</Text>
                      <Text className='featureBoxText'>We're always here when you need us—day or night. Our dedicated support team is available 24/7 to assist you with any questions, concerns, or help you might need. Reach out anytime, and we'll be ready to respond quickly and reliably.</Text>
                  </Box>
                </Box>
                <Box className='featuresBoxCenter' mt={15}>
                  <IconTruckFilled  className='featureBoxIcon' />
                  <Box>
                    <Text className='featureBoxHead'>Fast Delivery</Text>
                    <Text className='featureBoxText'>Get what you need—when you need it. We prioritize quick processing and reliable shipping to ensure your order arrives on time, every time. Speedy service without compromising care.</Text>
                  </Box>
                </Box>
              </Grid.Col>
              <Grid.Col span={{xs:15 , sm:15 , md:4 , lg:4 }}>
              <Box className='featuresBox'>
                  <IconCreditCardFilled  className='featureBoxIcon'/>
                  <Text className='featureBoxHead'>Payment With Secure System</Text>
                  <Text className='featureBoxText'>Shop with confidence knowing your information is protected. Our advanced encryption and trusted payment gateways ensure every transaction is safe, secure, and seamless. Your privacy matters, and we're committed to keeping your data protected at every step.</Text>
                  </Box>
              </Grid.Col>
            </Grid>
    </Container>

            {/*--------------------Review Section -----------------------*/}
            
            <Container fluid px={60} pb={80}>
        <Text className="reviewHead">What Our Customers Say</Text>
        <Carousel
          className="customCarousel"
          slideSize="33.33%"
          slidesToScroll={1}
          breakpoints={[
            { maxWidth: 'xs', slideSize: '100%', slidesToScroll: 1 }, 
            { maxWidth: 'md', slideSize: '33.33%', slidesToScroll: 1 }, 
          ]}
          slideGap="md"
          align="center"
          loop
          withControls
          withIndicators
          
        >
          {reviews
          .filter((review) => review.rating > 4 )
          .map((review) => (
            <Carousel.Slide key={review.id}>
              <Card className='carouselCard' shadow="sm" padding="lg" radius="md" withBorder>
                <Text className="reviewText">
                  "{review.details}"
                </Text>
                <Rating value={review.rating} readOnly size="md" className='reviewRating' />
                <Text className="reviewAuthor" weight={500}>
                  - {review.name}
                </Text>
              </Card>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Container>
      <Footer />
    </>
  )
}

