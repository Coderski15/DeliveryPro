// lib/axios.js
import axios from 'axios';

const client = axios.create({
    baseURL: 'https://deliverypro-backend.onrender.com', // Replace with your API URL
});

export default client;
