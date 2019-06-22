const express = require('express')
var bodyParser = require('body-parser')

const app = express()
const port = process.env.NODE_ENV === 'test' ? 1234 : 4567

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'))

app.post('/encode', (req, res) => {
    let buff = new Buffer(req.body.data);  
    let base64data = buff.toString('base64');
    res.status(200).json({payload: base64data});
})

app.post('/decode', (req, res) => {
    let buff = new Buffer(req.body.data, 'base64');  
    let text = buff.toString('ascii');
    res.status(200).send({payload: text});
})

let server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// Exporting the app module
module.exports = {app, server};