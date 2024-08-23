import axios from 'axios';

const activityRequest = axios.create({
    baseURL: 'http://localhost:8080/me/stored/'
});

export const get = async (path, option = {}) => {
    const response = await activityRequest.get(path, option);
    return response.data;
};

export default activityRequest;
