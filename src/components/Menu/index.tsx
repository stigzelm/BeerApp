import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Link,
} from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import TopBar from '../TopBar';

const drawerWidth = 240;

interface Props {
  children: React.ReactNode;
}

export default function ResponsiveDrawer(props: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <Divider />
      <List>
        <Link component={RouterLink} to={`/`}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary='Home' />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link component={RouterLink} to={`/beer`}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary='Beer List' />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <TopBar drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle}>
        <Box sx={{
          display: {
            xs: 'none',
            sm: 'flex'
          },
          gap: 3,
          ml: 'auto'
        }}>
          <Link component={RouterLink} to={`/`} color="inherit">
            Home
          </Link>
          <Link component={RouterLink} to={`/beer`} color="inherit">
            Beer List
          </Link>
        </Box>
      </TopBar>
      <Box
        component='nav'
        sx={{ flexShrink: { sm: 0 } }}
        aria-label='mailbox folders'
      >
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          anchor={'right'}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: '#000000'
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}
