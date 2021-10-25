const express = require('express')
const moment = require('moment')

const axios = require('axios')

async function Gains(req, res) {
    console.log(req.query)
    const { stock_name } = req.params;
    const { purchasedAmount, purchasedAt} = req.query
    
    const amount = +purchasedAmount
    const dateInvested = purchasedAt

    const date = moment(dateInvested).format('YYYY-MM-DD')
    // const atualDate = moment(new Date()).format('YYYY-MM-DD')
    const atualDate = "2021-10-22"

    console.log(amount, date, atualDate)

    if (date > 2021-10-22) {
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
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock_name}&apikey=5PUN0YOE2VBGVG6C`
        const resTimeSeriesDaily = await axios.request({ ...options, url: url })

        const dataTimeSeriesDaily = resTimeSeriesDaily.data

        let dates = [date, atualDate]
                
        let prices = []

        dates.forEach(date => {
            if (dataTimeSeriesDaily["Time Series (Daily)"][date]) {
                prices.push({
                    "pricedAtDate": parseFloat(dataTimeSeriesDaily['Time Series (Daily)'][date]['4. close']),
                    "pricedAt": date
                })
            }
        });
        
        console.log(dates)
        console.log(prices[0].pricedAtDate, prices[1].pricedAtDate)

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
        console.log(json)
        res.json(json)

    } catch (error) {
        return error, res.json('Nenhuma empresa encontrada!') 
    }
}

module.exports = Gains