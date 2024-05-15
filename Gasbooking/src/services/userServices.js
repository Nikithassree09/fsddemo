import { instance, protectedInstance } from "./instance";

const userServices = {
    register: async (email, password, username, location) => {
        console.log(username,email,password,location)
        return await instance.post('/users/register', {
            username: username,
            email: email,
            password: password,
            location: location
        });
    },
    login: async (email, password) => {
        return await instance.post('/users/login', {
            email: email,
            password: password
        }, {withCredentials: true });
    },

    getCurrentUser: async () => {
        return await protectedInstance.get('/users/profile');
    },
    logout: async () => {
        return await protectedInstance.get('/users/logout');
    },

}

export default userServices;