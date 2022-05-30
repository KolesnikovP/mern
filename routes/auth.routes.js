const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'некорректный email').isEmail(),
    check('password', 'минимальная длина пароля 6 символов')
      .isLength({min: 6})
  ],
  async (req, res)=> {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'некорректные данные при регистрации'
      })
    }

    const {email, password} = req.body
    const candidate = await User.findOne({email})

    if(candidate){
      return res.status(400).json({message: 'такой пользователь уже существует'})
    }

    const hashedPassword = await bcrypt.hash(password, 5)
    const user = new User({email, password: hashedPassword})

    await user.save()

    res.status(201).json({message: 'пользователь создан'})

  } catch (e) {
    res.status(500).json({message: 'что-то пошло не так, попробуйте снова!'})
  }
})

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'введите нормальный email').normalizeEmail().isEmail()
    check('password', 'введите пароль').exists()
  ] ,
  async (req, res)=> {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'некорректные данные при входе в систему'
        })
      }

      const {email, password} = req.body

      const user = await User.findOne({email})

      if (!user) {
        return res.status(400).json({message: 'пользователь не найден'})
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if(!isMatch) {
        return res.status(400).json({message: 'неверный пароль, попробуйте снова'})
      }



    } catch (e) {
      res.status(500).json({message: 'что-то пошло не так, попробуйте снова!'})
    }
})

module.exports = router