const express = require('express')
const cors = require('cors')
const moment = require('moment')
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

const axios = require('axios')


app.get('/stocks/:stock_name/quote', async function (req, res) {

    const { stock_name } = req.params;

    const overview = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stock_name}&apikey=5PUN0YOE2VBGVG6C`
    const globalQuotes = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock_name}&apikey=5PUN0YOE2VBGVG6C`

    const options = {
        method: 'GET',
        json: true,
        headers: { 'User-Agent': 'request' }
    }

    try {
        const resOverview = await axios.request({ ...options, url: overview })
        const resGlobalQuotes = await axios.request({ ...options, url: globalQuotes })

        const dataOverview = resOverview.data
        const { Name: name } = dataOverview

        const dataGlobalQuotes = resGlobalQuotes.data
        const lastPrice = dataGlobalQuotes['Global Quote']['05. price']
        const pricedAt = dataGlobalQuotes['Global Quote']['07. latest trading day']

        const json = { 'Empresa': name, 'Preço': lastPrice, 'Data': pricedAt }

        res.json(json)

    } catch (error) {
        return res.json('Nenhuma empresa encontrada!')
    }
})

app.get('/stocks/:stock_name/history', async function (req, res) {

    const { stock_name } = req.params;

    const initial = req.query.from
    const final = req.query.to

    const from = moment(initial).format('YYYY-MM-DD')
    const to = moment(final).format('YYYY-MM-DD')

    console.log(from, to)

    if (from > to) {
        res.json({ "erro": "Data inicial maior que final" })
        res.status(400)
    }

    const options = {
        method: 'GET',
        json: true,
        headers: { 'User-Agent': 'request' }
    }

    const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stock_name}&apikey=5PUN0YOE2VBGVG6C`
    const resOverview = await axios.request({ ...options, url: url })
    const dataOverview = resOverview.data
    const { Symbol: symbol } = dataOverview

    if (symbol == '') {
        return res.json('Informe uma empresa válida!')
    }

    try {
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock_name}&outputsize=compact&apikey=5PUN0YOE2VBGVG6C`
        const resTimeSeriesDaily = await axios.request({ ...options, url: url })

        const dataTimeSeriesDaily = resTimeSeriesDaily.data


        let dates = [from, to]

        let prices = []

        dates.forEach(date => {
            if (dataTimeSeriesDaily["Time Series (Daily)"][date]) {
                prices.push({
                    "opening": parseFloat(dataTimeSeriesDaily['Time Series (Daily)'][date]['1. open']),
                    "low": parseFloat(dataTimeSeriesDaily['Time Series (Daily)'][date]['3. low']),
                    "high": parseFloat(dataTimeSeriesDaily['Time Series (Daily)'][date]['2. high']),
                    "closing": parseFloat(dataTimeSeriesDaily['Time Series (Daily)'][date]['4. close']),
                    "pricedAt": date
                })
            }
        });

        console.log(prices)

        const json = { "name": symbol, "prices": prices }

        res.json(json)

    } catch (error) {
        return res.json('Nenhuma empresa encontrada!')
    }
})

app.get('/stocks/:stock_name/gains', async function (req, res) {

    const { stock_name } = req.params;

    const amount = req.body.purchasedAmount
    const dateInvested = req.body.purchasedAt

    const date = moment(dateInvested).format('YYYY-MM-DD')
    const atualDate = moment(new Date()).format('YYYY-MM-DD')

    if (date > atualDate) {
        res.json({ "erro": "Data inicial maior que final" })
        res.status(400)
    }

    const options = {
        method: 'GET',
        json: true,
        headers: { 'User-Agent': 'request' }
    }

    const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stock_name}&apikey=5PUN0YOE2VBGVG6C`
    const resOverview = await axios.request({ ...options, url: url })
    const dataOverview = resOverview.data
    const { Symbol: symbol, Name: name } = dataOverview

    if (symbol == '') {
        return res.json('Informe uma empresa válida!')
    }

    try {
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock_name}&outputsize=compact&apikey=5PUN0YOE2VBGVG6C`
        const resTimeSeriesDaily = await axios.request({ ...options, url: url })

        const dataTimeSeriesDaily = resTimeSeriesDaily.data


        let dates = [date, atualDate]
        console.log(dates)

        let prices = []

        dates.forEach(date => {
            if (dataTimeSeriesDaily["Time Series (Daily)"][date]) {
                prices.push({
                    "pricedAtDate": parseFloat(dataTimeSeriesDaily['Time Series (Daily)'][date]['4. close']),
                    "pricedAt": date
                })
            }
        });
        
        const possibleGain = (amount * prices[0].pricedAtDate )
        const currentGain = (amount * prices[1].pricedAtDate)

        const capitalGains = currentGain - possibleGain

        const json =
        {
            "name": name,
            "purchasedAmount": amount,
            "purchasedAt": date,
            "prices": prices,
            "capitalGains": capitalGains.toFixed(2)  
        }

        res.json(json)

    } catch (error) {
        return res.json('Nenhuma empresa encontrada!')
    }
})

let data = []

app.get('/stocks/:stock_name/compare', async function (req, res) {
    const { stock_name } = req.params;

    const overview = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stock_name}&apikey=5PUN0YOE2VBGVG6C`
    const globalQuotes = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock_name}&apikey=5PUN0YOE2VBGVG6C`

    const options = {
        method: 'GET',
        json: true,
        headers: { 'User-Agent': 'request' }
    }

    try {
        const resOverview = await axios.request({ ...options, url: overview })
        const resGlobalQuotes = await axios.request({ ...options, url: globalQuotes })

        const dataOverview = resOverview.data
        const { Name: name } = dataOverview

        const dataGlobalQuotes = resGlobalQuotes.data
        const lastPrice = dataGlobalQuotes['Global Quote']['05. price']
        const pricedAt = dataGlobalQuotes['Global Quote']['07. latest trading day']

        let json = { 'Empresa': name, 'Preço': lastPrice, 'Data': pricedAt }
        data.push(json)
        res.json({ "lastPrice": data })

    } catch (error) {
        res.json('Nenhuma empresa encontrada!')
        res.status(400)
    }
})

app.listen(3003, () => {
    console.log('API Rodando!')
})