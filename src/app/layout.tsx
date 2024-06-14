"use client";

import './globals.css';
import { ReactNode } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../theme';
import Navbar from '../components/Navbar';
import { AuthProvider } from '../context/AuthContext';
import Head from 'next/head';

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <Head>
        <title>Vehicle Marketplace</title>
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet"></link>
      </Head>
      <body>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
