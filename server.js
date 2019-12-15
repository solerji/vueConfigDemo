const express = require('express')
const app = express()

app.get('/api/info', (req, res) => {
  res.json({
    name: 'lala',
    age: 5
  })
})
app.listen('9092')
