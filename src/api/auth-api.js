const axios = require('axios')

const apiUrl = '//node-express-env.eba-cf9fqmze.eu-central-1.elasticbeanstalk.com'

exports.AuthAPI = {
    login: async (email, password) => {
        try {
            const response = await axios.post(apiUrl + '/login', {
                email, password
            })
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            throw e
        }
    },
    signup: async (user) => {
        try {
            const response = await axios.post(apiUrl + '/register', user)
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            throw e
        }
    },
    isAuthenticated: () => {
        const token = localStorage.getItem('token');
        return token ? true : false
    },
    signOut: () => {

        localStorage.removeItem('token')
    }
}