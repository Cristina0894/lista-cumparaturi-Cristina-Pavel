const express = require('express')
const mongoose = require('mongoose')
const item = require('./modele/item')
const itemRouter = require('./routes/items')
const methodOverride = require('method-override')
const app = express()


mongoose.connect('mongodb://127.0.0.1:27017/listacumparaturi', {
    useNewUrlParser: true, useUnifiedTopology: true
  })

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended:false }))
app.use(methodOverride('_method'))


app.get('/', async (req, res) => {
    const items = await item.find().sort({creatLa: 'desc'})
    res.render('items/index', { items: items })
})

app.listen(3000)

app.use('/items', itemRouter)