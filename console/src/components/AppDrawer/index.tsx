import { useState } from 'react';
import {
  Drawer,
  Box,
  Divider,
} from '@mui/material';
import {
  Dashboard,
  Person,
  Settings,
  Schedule,
  Notifications,
  Analytics,
  Folder,
} from '@mui/icons-material';
import { Header } from './Header';
import { NavLinks } from './NavLinks';
import { UserProfile } from './UserProfile';

const DRAWER_WIDTH = 280;

export const AppDrawer = () => {
  const [open, setOpen] = useState(true);

  const primaryNavLinks = [
    { title: 'Dashboard', icon: <Dashboard />, path: '/' },
    { title: 'Create Invoice', icon: <Analytics />, path: '/invoices/create/business' },
    { title: 'Manage Invoices', icon: <Schedule />, path: '/invoices' },
    { title: 'Customers', icon: <Folder />, path: '/customers' },
  ];

  const secondaryNavLinks = [
    { title: 'Profile', icon: <Person />, path: '/business' },
    { title: 'Settings', icon: <Settings />, path: '/settings' },
  ];


  return (
    <Drawer
    variant="permanent"
    anchor="left"
    open={open}
    sx={{
        width: open ? DRAWER_WIDTH : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
        width: DRAWER_WIDTH,
        boxSizing: 'border-box',
        bgcolor: 'grey.50',
        borderRight: 'none',
        transition: 'all 0.3s ease-in-out',
        transform: open ? 'translateX(0)' : `translateX(-${DRAWER_WIDTH}px)`,
        },
    }}
    >
    <Box
        sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        }}
    >
        <Header toggleDrawer={() => {}}/>
        <NavLinks links={primaryNavLinks}/>
        <Divider sx={{ mx: 2, borderColor: 'grey.200' }} />
        <NavLinks links={secondaryNavLinks}/>
        <UserProfile />
    </Box>
    </Drawer>
  );
};

