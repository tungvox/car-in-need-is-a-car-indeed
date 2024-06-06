"use client";

import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Vehicle Marketplace
        </Typography>
        <Link href="/" passHref>
          <Button color="inherit">Home</Button>
        </Link>
        <Link href="/profile" passHref>
          <Button color="inherit">Profile</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
