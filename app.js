const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use('/api/auth', require('./routes/auth.routes')) // можно и так делать чтобы не плодить переменные

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