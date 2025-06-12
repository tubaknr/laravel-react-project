import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/api',
});

// before sending request
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    // console.log(token);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// after receiving response
axiosClient.interceptors.response.use(
    (response) => {
        // if response fulfilled
        console.log('RESP axios-client.js: ', response);
        return response;
    },
    (error) => {
        try {
            // if rejected
            const { response } = error;

            if (response.status === 401) {
                // if not authorized;
                localStorage.removeItem('ACCESS_TOKEN');
            }
        } catch (e) {
            console.log(e);
        }

        throw error;
    },
);

export default axiosClient;
