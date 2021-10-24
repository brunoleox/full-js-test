const express = require('express')
const axios = require('axios')

let data = []

async function Compare (req, res) {
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
} 

module.exports = Compare