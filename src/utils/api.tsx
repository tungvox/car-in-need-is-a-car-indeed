import axios from 'axios';

export const createVehicle = async (vehicleData: FormData) => {
  const response = await axios.post('/api/create-vehicle', vehicleData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    withCredentials: true,
  });
  return response.data;
};

export const getVehicleMakes = async () => {
  const response = await axios.get('/api/vehicle-makes');
  return response.data;
};

export const sendMessage = async (messageData: { receiver_id: number; vehicle_id?: number; content: string }) => {
  const response = await axios.post('/api/messages', messageData, { withCredentials: true });
  return response.data;
};

export const leaveReview = async (reviewData: { vehicle_id: number; rating: number; comment: string }) => {
  const response = await axios.post('/api/review', reviewData, { withCredentials: true });
  return response.data;
};
