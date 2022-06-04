const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')

const app = express()

app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.routes')) // можно и так делать чтобы не плодить переменные
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))


/* у нас есть скрипт который запускает только ноду и нам надо подвязать еще и фронт.
* Для этого нам надо отдавать еще и статику */
if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = config.get('port') || 4000

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
    })
  } catch (e) {
    console.log('server ERROR', e.message)
    process.exit(1) // метод позволяющий завершить процесс
  }
}
start()
app.listen(PORT, () => console.log(`app has been started... PORT ${PORT}`))