const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  if(req.method === 'OPTIONS') { // это спец метод который есть в rest api который проверяет
    // доступность сервера
    return next()
  }
  try {

    const token = req.headers.authorization.split(' ')[1]
    // специальное поле у хедера - Bearer TOKEN

    if(!token) {
      return res.status(401).json({message: 'нет авторизации'})
    }

    const decoded = jwt.verify(token, config.get('jwtSecret'))
    req.user = decoded
    next()
  } catch (e) {
    return res.status(401).json({message: 'нет авторизации'})
  }
}