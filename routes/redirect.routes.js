const router = require('express').Router()
const Link = require('../models/Link')

router.get('/:code', async (req, res) => {
  try {

    const link = await Link.findOne({code: req.params.code})

    if (link) {
      link.clicks++
      await link.save()
      return res.redirect(link.from)
    }
    res.status(404).json('Ссылка не найдена')
  } catch (e) {
    res.status(500).json({message: 'что-то пошло не так, попробуйте снова!'})
  }
})

module.exports = router;