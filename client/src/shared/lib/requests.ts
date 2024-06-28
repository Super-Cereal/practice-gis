const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': '9r5OcQBCYGxC7mK2Fu02ZIhusiSy92oELWALOVF3d3wZKi6pLuetbBGBqr0U4SDb',
    Authorization: 'Bearer {token}',
};

export const setAuthToken = (token: string) => {
    defaultHeaders.Authorization = `Bearer ${token}`;
    localStorage.setItem('access_token', token);
};

export const removeAuthToken = () => {
    localStorage.removeItem('access_token');
};

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const get = async (path: string) => {
    const response = await fetch(API_URL + path, { method: 'GET', headers: defaultHeaders });

    if (!response.ok) {
        return Promise.reject(response);
    }

    return response.json();
};

export const post = async (path: string, body: string | object) => {
    const response = await fetch(API_URL + path, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        return Promise.reject(response);
    }

    return response.json();
};
