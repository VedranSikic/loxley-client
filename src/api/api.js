const axios = require('axios')

//TODO Replace this
const apiUrl = 'http://node-express-env.eba-cf9fqmze.eu-central-1.elasticbeanstalk.com'
const alphaVantageUrl = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&apikey=MKNPM7HCUX6EEFWD&symbol='

const IndexAPI = {
    getNasdaq: async () => {
        return {
            symbol: "INDEXNASDAQ: .IXIC",
            open: 13255.64,
            high: 13460.88,
            low: 13242.97,
            price: 13429.98,
            volume: 0,
            latestTradingDay: "2021-05-14",
            previousClose: 0,
            change: 304.99,
            changePercent: 2.32
        }
    }, getSnP500: async () => {
        return {
            symbol: "INDEXSP: .INX",
            open: 4129.58,
            high: 4183.13,
            low: 4129.58,
            price: 4173.85,
            volume: 0,
            latestTradingDay: "2021-05-14",
            previousClose: 0,
            change: 61.35,
            changePercent: 1.49
        }
    }, getDOW: async () => {
        return {
            symbol: "INDEXDJX: .DJI",
            open: 34050.86,
            high: 34454.05,
            low: 34050.86,
            price: 34382.13,
            volume: 0,
            latestTradingDay: "2021-05-14",
            previousClose: 0,
            change: 360.68,
            changePercent: 1.06
        }
    }
}

const AlphaVantageAPI = {
    get: async (symbol) => {
        try {
            const response = await axios.get(alphaVantageUrl + symbol)
            const data = response.data["Global Quote"]
            if (!data["01. symbol"]) return undefined

            return {
                symbol: data["01. symbol"],
                open: data["02. open"],
                high: data["03. high"],
                low: data["04. low"],
                price: data["05. price"],
                volume: data["06. volume"],
                latestTradingDay: data["07. latest trading day"],
                previousClose: data["08. previous close"],
                change: data["09. change"],
                changePercent: data["10. change percent"]
            }
        } catch (e) {
            return undefined
        }
    }
}

const Auth = {
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

const StockAPI = {
    create: async (stock) => {
        try {
            await axios.post(apiUrl + '/stock/create', stock, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
        } catch (e) {
            throw e
        }
    },
    read: async () => {
        try {
            const response = await axios.get(apiUrl + '/stock/', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            return response.data.stocks
        } catch (e) {
            throw e
        }
    },
    profile: async (_id) => {
        try {
            const response = await axios.get(apiUrl + `/stock/${_id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            const quote = await AlphaVantageAPI.get(response.data.symbol)
            return {
                stock: response.data,
                quote
            }
        } catch (e) {
            throw e
        }
    }
}

export { Auth, StockAPI, IndexAPI }