const axios = require('axios')

const alphaVantageUrl = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&apikey=MKNPM7HCUX6EEFWD&symbol='

exports.StockAPI = {
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
