import { Container, Grid , Text , Anchor} from '@mantine/core';
import React from 'react';
import './Footer.css';

export const Footer = () => {
    const menuItems = [
        { title: 'Sale', link: '#' },
        { title: 'New Arrivals', link: '#' },
        { title: 'Formal Men', link: '#' },
        { title: 'Formal Women', link: '#' },
        { title: 'Casual Men', link: '#' },
        { title: 'Casual Women', link: '#' },
      ];
    const helpItems = [
        { title: 'FAQ', link: '#' },
        { title: 'Customer Service', link: '#' },
        { title: 'Refund and Return', link: '#' },
        { title: 'Terms and Conditions', link: '#' },
        { title: 'Shipping', link: '#' },
        ];
    const accountItems = [
        { title: 'My Account', link: '#' },
        { title: 'My Orders', link: '#' },
        { title: 'Vouchers and Discounts', link: '#' },
        ];
  return (
    <Container fluid className='footerContainer' px={60} py={60}>
        <Grid columns={12}>
            <Grid.Col span={{xs:6 , sm:6 , md:3 , lg:3}}>
                <Text className='footerHead'>COUTURIER</Text>
                <Grid className='footerGrid'>
                    <Grid.Col span={3}>
                        <Text className='footerText' >WhatsApp</Text>
                    </Grid.Col>
                    <Grid.Col span={9}>
                        <Text className='footerText'>: +91 81290 93361</Text>
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <Text className='footerText' >Email </Text>
                    </Grid.Col>
                    <Grid.Col span={9}>
                        <Text className='footerText'>: couturier@gmail.com</Text>
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <Text className='footerText'>Address</Text>
                    </Grid.Col>
                    <Grid.Col span={9}>
                        <Text className='footerText'>: Lorem ipsum street, <br/>Block A, India</Text>
                    </Grid.Col>
                </Grid>
            </Grid.Col>
            <Grid.Col span={{xs:6 , sm:6 , md:3 , lg:3}}>
                <Text className='footerHeadSub'>Menu</Text>
                {menuItems.map((item, index) => (
                    <Anchor key={index} href={item.link} className="footerLink">
                    {item.title}
                    </Anchor>
                ))}
            </Grid.Col>
            <Grid.Col span={{xs:6 , sm:6 , md:3 , lg:3}}>
                <Text className='footerHeadSub'>Get Help</Text>
                {helpItems.map((item , index) =>(
                    <Anchor key={index} href={item.link} className='footerLink'>
                        {item.title}
                    </Anchor>
                ))}
            </Grid.Col>
            <Grid.Col span={{xs:6 , sm:6 , md:3 , lg:3}}>
            <Text className='footerHeadSub'>Account</Text>
            {accountItems.map((item , index) =>(
                <Anchor key={index} href={item.link} className='footerLink'>
                    {item.title}
                </Anchor>
            ))}
            </Grid.Col>
        </Grid>
    </Container>
  )
}
