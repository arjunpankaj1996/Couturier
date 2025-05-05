import React, { useEffect, useState } from 'react'
import './ProductList.css'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Container, Flex, Grid, Text, Pagination, Collapse, Checkbox, Button, TextInput , Box } from '@mantine/core'
import { useProducts } from '../hooks/useProducts'
import { ProductCard } from '../components/ProductCard'
import { useDisclosure } from '@mantine/hooks'
import { IconChevronRight, IconSearch } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import {  useSearchParams } from 'react-router-dom'
import { useMediaQuery } from '@mantine/hooks'

const ProductList = () => {

  const { data: products, isLoading, isError  } = useProducts();
  const smallScreen = useMediaQuery('(max-width : 992px)')
  const [searchParams, setSearchParams] = useSearchParams();

  const [openCategory, { toggle: toggle1 }] = useDisclosure(false);
  const [openSize, { toggle: toggle2 }] = useDisclosure(false);
  const [openPrice, { toggle: toggle3 }] = useDisclosure(false);

  const [filterProduct , setFilterProduct] = useState([]);
  const [activePage, setActivePage] = useState(1);
  
  
  const itemPerPage = 6;
  const startIndex = (activePage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;

  

  //Read filter from searchParams
  const selectedCategory = searchParams.getAll('category') || [];
  const selectedSize = searchParams.getAll('size') || [];
  const selectedPrice = searchParams.getAll('price') || [];
  const searchQuery = searchParams.get('search') || '';

  const [searchInput , setSearchInput] = useState(searchQuery);

  const form = useForm({
    initialValues: {
      category: selectedCategory,
      size: selectedSize,
      price: selectedPrice,
    },
  });

useEffect(()=>{
  filterFunction(selectedCategory,selectedSize,selectedPrice,searchQuery)
},[products,searchParams]);

  //Filter products from searchParams
const filterFunction =  (selectedCategory,selectedSize,selectedPrice,searchQuery)=>{
  const filteredProducts = products?.filter((product) => {
    const matchesCategory = selectedCategory?.length ? selectedCategory?.includes(product.gender) : true;
    const matchesSize = selectedSize?.length ? selectedSize?.some(size => product.size?.[size.toLowerCase()] > 0) : true;
    const matchesPrice = selectedPrice?.length ? selectedPrice?.some((range) => {
      const [minPrice, maxPrice] = range?.split('-')?.map((price) => parseInt(price?.trim(), 10))
      return product.price >= minPrice && product.price <= maxPrice }) : true;
    const matchesSearch = searchQuery ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    return matchesCategory && matchesSize && matchesPrice && matchesSearch;
  });
  setFilterProduct(filteredProducts)
}

  const paginatedProducts = filterProduct?.slice(startIndex, endIndex);
  
  const handleApplyFilter = (values) => {
    setSearchParams(values);
  }

  const handleCancelFilters = () => {
    setSearchParams({});
    form.reset();
  }

  const handleSearch =()=>{
    searchParams.delete('category');
    searchParams.delete('size');
    searchParams.delete('price');
    form.reset();
  if (searchInput) {
    searchParams.set('search', searchInput);
  } else {
    searchParams.delete('search');
  }
  setSearchParams(searchParams);
  }
  if (isLoading) {
    return <Text>Loading products...</Text>;
  }

  if (isError) {
    return <Text>Error fetching products. Please try again later.</Text>;
  }
  

  return (
    <>
      <Header />
      <Container p={smallScreen ? 20 : 60} fluid>
        <Flex justify='space-between' className='productSearch'>
            <Text component='h1' className='productListHead'>ALL PRODUCTS</Text>
            <Box display='flex' className='productSearchBox'>
              <TextInput 
              placeholder='Search Products..'
              value={searchInput}
              onChange={(e) => {setSearchInput(e.currentTarget.value)}}
              /> 
              <Button onClick={() => handleSearch()}><IconSearch /></Button>
            </Box>
        </Flex>
        <Grid columns={12}>
          <Grid.Col span={{ xs: 12, sm: 12, md: 3, lg: 3 }}>
            <form onSubmit={form.onSubmit((values) => handleApplyFilter(values))}>
              <Flex w='100%'
                justify='space-between'
                onClick={toggle1}
                className='filterHead'
                style={{
                  backgroundColor: openCategory ? 'var(--primary-color-1)' : '#fff',
                  color: openCategory ? '#fff' : '#000',
                }}>
                <Text>CATEGORY</Text>
                <IconChevronRight style={{
                  transform: openCategory ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                }} />
              </Flex>
              <Collapse in={openCategory}>
                <Checkbox.Group
                  {...form.getInputProps('category')} >
                  <Checkbox
                    className="filterCheckbox"
                    label='Men'
                    value="Men" />
                  <Checkbox
                    className="filterCheckbox"
                    value='Women'
                    label='Women' />
                </Checkbox.Group>
              </Collapse>
              <Flex w='100%'
                justify='space-between'
                onClick={toggle2}
                className='filterHead'
                style={{
                  backgroundColor: openSize ? 'var(--primary-color-1)' : '#fff',
                  color: openSize ? '#fff' : '#000',
                }}>
                <Text>SIZE</Text>
                <IconChevronRight style={{
                  transform: openSize ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                }} />
              </Flex>
              <Collapse in={openSize}>
                <Checkbox.Group
                  {...form.getInputProps('size')}>
                  <Checkbox className="filterCheckbox" value='Small' label='Small' />
                  <Checkbox className="filterCheckbox" value='Medium' label='Medium' />
                  <Checkbox className="filterCheckbox" value='Large' label='Large' />
                  <Checkbox className="filterCheckbox" value='Extra Large' label='Extra Large' />
                </Checkbox.Group>
              </Collapse>

              <Flex w='100%'
                justify='space-between'
                onClick={toggle3}
                className='filterHead'
                style={{
                  backgroundColor: openPrice ? 'var(--primary-color-1)' : '#fff',
                  color: openPrice ? '#fff' : '#000',
                }}>
                <Text>PRICE</Text>
                <IconChevronRight style={{
                  transform: openPrice ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                }} />
              </Flex>
              <Collapse in={openPrice}>
                <Checkbox.Group
                  {...form.getInputProps('price')}>
                  <Checkbox className="filterCheckbox" value='500 - 1000' label='500 - 1000' />
                  <Checkbox className="filterCheckbox" value='1000 - 2000' label='1000 - 2000' />
                  <Checkbox className="filterCheckbox" value='2000 - 3000' label='2000 - 3000' />
                  <Checkbox className="filterCheckbox" value='3000 - 4000' label='3000 - 4000' />
                </Checkbox.Group>
              </Collapse>
              <Flex mt={30} justify={'end'}>
                <Button className='buttonMain' type="submit">Apply</Button>
                <Button className='filterCancel' onClick={handleCancelFilters}>Cancel</Button>
              </Flex>
            </form>
          </Grid.Col>
          <Grid.Col span={{ lg: 9 }} >
            <Grid gutter='xl' columns={12}>
              {paginatedProducts
                ?.map((product) => (
                  <Grid.Col key={product.id} span={{ xs: 6, sm: 6, md: 6, lg: 4 }}>
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
          </Grid.Col>
          <Flex mt='lg' justify='flex-end' w='100%'>
            <Pagination
              className=''
              total={Math.ceil(filterProduct?.length / itemPerPage)}
              page={activePage}
              onChange={setActivePage}
            />
          </Flex>
        </Grid>
      </Container>
      <Footer />
    </>
  )
}

export default ProductList

