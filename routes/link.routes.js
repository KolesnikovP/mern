const router = require('express').Router()
const Link = require('../models/Link')
const {validationResult} = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post('/generate', async (req, res)=> {
  try {

  } catch (e) {
    res.status(500).json({message: 'что-то пошло не так, попробуйте снова!'})
  }
})
router.get('/', async (req, res)=>{
  try {
    const links = await Link.find({owner: null}) // ???? временно
    res.json(links)
  } catch (e) {
    res.status(500).json({message: 'что-то пошло не так, попробуйте снова!'})
  }
})

router.get('/:id', async (req, res) => {
  try {
    const link = await Link.findById(req.params.id) // ???? временно
    res.json(link)
  } catch (e) {
    res.status(500).json({message: 'что-то пошло не так, попробуйте снова!'})
  }
})
module.exports = router