const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
// const AIMLParser = require('aimlparser')

const app = express()
const port = process.env.PORT || 4000
// const aimlParser = new AIMLParser({ name:'HelloBot' })

// aimlParser.load(['test-aiml.xml'])

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    let msg = req.body.events[0].message.text
    // aimlParser.getResult('Hello', (answer, wildCardArray, input) => {
    //     reply(reply_token, input + "-------->" + answer)
    // })

    reply(reply_token, msg)
    res.sendStatus(200)
})

app.listen(port)

function reply(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer SXacpAKQELBJCyS7RfhIpXs0Wd6wgk1plVX5ox1OKMywptsjpzp+uCusljlwn7A9F8b/kxXcmHoTIx7bsJuo4+oLarFGBKmyhF6aHmW1B5ng4Y6sLrpJWi/RI8cv3msPEFRoxx6i9CZBBRFRK6NRUgdB04t89/1O/w1cDnyilFU='
    }

    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: msg
        }]
    })

    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}