import './globals.css';
import { ReactNode } from 'react';
import Navbar from '../components/Navbar';

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <head>
        <title>Vehicle Marketplace</title>
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
