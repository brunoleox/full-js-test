const express = require('express')
const moment = require('moment')

const axios = require('axios')

async function History(req, res) {

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
}

module.exports = History