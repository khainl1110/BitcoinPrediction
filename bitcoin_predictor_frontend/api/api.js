import { create } from 'apisauce';

const api = create({
    baseURL: 'http://127.0.0.1:8000', // Replace with your API base URL
});
  
export const getData = () => {
    return api.get('/greetings');
};