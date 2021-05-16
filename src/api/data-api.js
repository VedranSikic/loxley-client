const axios = require('axios')

//TODO Replace this
const apiUrl = '//node-express-env.eba-cf9fqmze.eu-central-1.elasticbeanstalk.com'

const { StockAPI } = require('./stock-api')

exports.DataAPI = {
    create: async (stock) => {
        await axios.post(apiUrl + '/stock/create', stock, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
    },
    read: async () => {
        const response = await axios.get(apiUrl + '/stock/', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data.stocks
    },
    profile: async (_id) => {
        const response = await axios.get(apiUrl + `/stock/${_id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        const quote = await StockAPI.get(response.data.symbol)
        return {
            stock: response.data,
            quote
        }
    }
}