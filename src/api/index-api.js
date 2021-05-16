export const IndexAPI = {
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
