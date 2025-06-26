import axios from 'axios';

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    withCredentials: false,
    // headers: {
    //     'Content-Type': 'application/json',
    //     Accept: 'application/json',
    //     'Access-Control-Allow-Origin': 'http://localhost:3000',
    //     'Access-Control-Allow-Credentials': 'true',
    //     'Cache-Control': 'no-cache, private',
    // },
});



let setLoadingFn: (val: boolean) => void;

export const setGlobalLoadingHandler = (fn: typeof setLoadingFn) => {
    setLoadingFn = fn;
};

API.interceptors.request.use((config) => {
    config.headers = config.headers ?? {};
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    // config.headers['Host'] = 'localhost:8000';
    // config.headers['Date'] = new Date().toUTCString();

    // console.log('config headers', config.headers);

    // 👇 Log full request URL for debugging
    // const fullUrl = `${config.baseURL}${config.url}`;
    // console.log('[REQUEST URL]', fullUrl);


    // Debug: Check if any cookies are being sent
    // console.log('Document cookies:', document.cookie);
    // console.log('Request config:', {
    //     url: config.url,
    //     baseURL: config.baseURL,
    //     withCredentials: config.withCredentials,
    //     headers: config.headers
    // });

    // Remove any cookies that might be sent
    // delete config.headers.Cookie;

    setLoadingFn?.(true);
    return config;
});

API.interceptors.response.use(
    (response) => {
        setLoadingFn?.(false);
        return response;
    },
    (error) => {
        setLoadingFn?.(false);
        return Promise.reject(error);
    }
);

export default API;
