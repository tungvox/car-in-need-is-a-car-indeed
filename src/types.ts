export interface Vehicle {
    id: number;
    user_id: number;
    make: string;
    model: string;
    year: number;
    mileage: number;
    price: number;
    power: number;
    fueltype: string;
    location: string;
    description: string;
    dateposted: string;
  }
  
  export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    fullname?: string;
    phonenumber?: string;
    address?: string;
    profilepicture?: string;
    datejoined: string;
  }
  