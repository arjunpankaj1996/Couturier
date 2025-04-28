import './Header.css';
import {
  Anchor, Box, Burger,
  Button,
  Flex,
  Group, Drawer, ScrollArea, Divider,
  Menu
} from "@mantine/core"
import { IconShoppingCart, IconUserCircle, IconLogout, IconTruckDelivery } from '@tabler/icons-react';
import { useLogout } from '../hooks/useAuth';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';

export const Header = ({ insideLanding }) => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const navigate = useNavigate();
  const logout = useLogout();

  const isLoggedIn = !!localStorage.getItem('token');

  const handleLoginClick = () => {
    navigate('/login')
  }
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/ProductList' },
    { label: 'About', href: '#' },
    { label: 'Contact Us', href: '#' },
  ];
  return (
    <Box>
      <header className="header">
        <Group justify='space-between' h="100%">
          <h1 style={insideLanding && { color: "#fff" }} className='logoText' ><span className='text-primary'>C</span>OUTURIER</h1>
          <Group h="100%" gap={0} visibleFrom='sm'>
            {menuItems.map((item, index) => (
              <Anchor key={index} href={item.href} className={`${insideLanding ? 'headerLinkLanding' : 'headerLink'}`}>
                {item.label}
              </Anchor>
            ))}
          </Group>
          <Flex visibleFrom='sm' gap='lg' align='center'>

            {isLoggedIn ? (
              <Menu
                width={300}
                position='bottom'>
                <Menu.Target>
                  <IconUserCircle size={34} stroke={1.5} />
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item leftSection={<IconTruckDelivery size={16} stroke={1.5} />}
                  onClick={()=>navigate('/MyOrders')}>
                    My Orders
                  </Menu.Item>
                  <Menu.Item leftSection={<IconShoppingCart size={16} stroke={1.5} />}
                    onClick={() => navigate('/MyCart')}>
                    Cart
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item leftSection={<IconLogout size={16} stroke={1.5} />} onClick={handleLogout}>
                    Log Out
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <Button className='burgerButton' onClick={handleLoginClick}>Login</Button>
            )}
          </Flex>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
            color="var(--primary-color-2)" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="md"
        padding="md"
        title="Couturier"
        hiddenFrom="sm"
        zIndex={9999}>

        <ScrollArea h="calc(100vh - 80px)" mx="-md">
          <Divider my="sm" />
          {menuItems.map((item, index) => (
            <a key={index} href={item.href} className="headerLinkDrawer">
              {item.label}
            </a>
          ))}
          <Divider my="sm" />
          <Group justify="center" pb="xl" px="md">
            {isLoggedIn ? (
              <Menu
                width={300}
                position='bottom' zIndex={99999}>

                <Menu.Target>
                  <IconUserCircle size={26} stroke={1.5} />
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item leftSection={<IconTruckDelivery size={16} stroke={1.5} />}>
                    My Orders
                  </Menu.Item>
                  <Menu.Item leftSection={<IconShoppingCart size={16} stroke={1.5} />} onClick={() => navigate('/MyCart')}>
                    Cart
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item leftSection={<IconLogout size={16} stroke={1.5} />} onClick={handleLogout}>
                    Log Out
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <Button className='burgerButton' onClick={handleLoginClick}>Login</Button>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  )
}

