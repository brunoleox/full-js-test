const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

const axios = require('axios')

const Quote =  require('./routes/quote')
const History =  require('./routes/history')
const Gains =  require('./routes/gains')
const Compare =  require('./routes/compare')

app.get('/stocks/:stock_name/quote', Quote )

app.get('/stocks/:stock_name/history', History)

app.get('/stocks/:stock_name/gains', Gains )

app.get('/stocks/:stock_name/compare', Compare )

app.listen(3003, () => {
    console.log('API Rodando!')
})