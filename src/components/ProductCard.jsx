import React from 'react'
import { Card , Image ,Text , Box , Anchor, AspectRatio} from '@mantine/core'
import './ProductCard.css'
import { useNavigate } from 'react-router-dom'

export const ProductCard = ({id , image , title ,gender , price }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/Productdetails?id=${id}`);
}
  return (
    <Card className="productCard">
      <Card.Section>
        <AspectRatio ratio={4 / 4}>
            <Image src={image} alt={title} height={100} />
        </AspectRatio>
      </Card.Section>
      <Box className="productDetails">
        <Text className="productName">{title}</Text>
        <Text className="productPrice">{gender}</Text>
        <Text className="productPrice">INR {price}</Text>
        <Anchor 
          onClick={(e) => {
            e.preventDefault();
            handleProductClick();
          }}
          className="shopNowLink">
          View Details
        </Anchor>
      </Box>
    </Card>
  )
}
