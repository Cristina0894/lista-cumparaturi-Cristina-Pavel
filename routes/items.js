const express = require('express')
const Item = require('../modele/item')
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('items/new', { item: new Item() })
})

router.get('/edit/:id', async (req, res) => {
  const item = await Item.findById(req.params.id)
  res.render('items/edit', { item: item })
})

router.post('/edit-bifa/:id', async (req, res, next) => {
  req.item = await Item.findById(req.params.id)
  next()
}, updateItemAndRedirect('edit-bifa'))


router.get('/:slug', async (req, res) => {
  const item = await Item.findOne({ slug: req.params.slug })
  if (item == null) res.redirect('/')
  else{
  res.render('items/show', { item: item })
}
})

router.post('/', async (req, res, next) => {
  req.item = new Item()
  next()
}, saveItemAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
  req.item = await Item.findById(req.params.id)
  next()
}, saveItemAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

function updateItemAndRedirect(path) {
    return async (req, res) => {
      let item = req.item
      item.bifat = `${item.bifat == "bifat"? "farabifa" : "bifat"}`
      try {
        item = await item.save()
        res.redirect(`/`)
      } catch (e) {
        res.render(`items/${path}`, { item: item })
      }
    }
  }

  function saveItemAndRedirect(path) {
    return async (req, res) => {
      let item = req.item
      item.titlu = req.body.titlu
      item.detalii = req.body.detalii
      item.bifat = req.body.bifat
      try {
        item = await item.save()
        res.redirect(`/`)
      } catch (e) {
        console.log(e);
        res.render(`items/${path}`, { item: item })
      }
    }
  }

module.exports = router