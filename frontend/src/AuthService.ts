import axios from 'axios';

const API_URL = 'https://your-auth-server.com';

interface User {
    accessToken: string;
    username: string;
}

const login = async (username: string, password: string): Promise<User> => {
    try {
        const response = await axios.post<User>(`${API_URL}/login`, { username, password });
        if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        throw new Error('Login failed');
    }
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = (): User | null => {
    const userString = localStorage.getItem('user');
    if (userString) {
        return JSON.parse(userString);
    }
    return null;
};

const AuthService = {
    login,
    logout,
    getCurrentUser
};

export default AuthService;
