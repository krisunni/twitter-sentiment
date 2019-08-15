'use strict';

const serverless = require('serverless-http');
const Sentiment = require('sentiment');
const sentiment = new Sentiment();
const express = require('express');
const app = express();
app.use(require('cors')());
app.use(require('body-parser').json());
const Twitter = require('twit');

const client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

let tweetsMap = new Map();
let requestPath;

app.get('/api/tweets/:screen_name', (req, res) => {
    requestPath = `statuses/user_timeline.json?screen_name=${req.params.screen_name}&count=200`;
    client
        .get(requestPath)
        .then(tweet => {
            tweetsMap = new Map();
            tweet.data.forEach(data => {
                tweetsMap.set(data.id, {"data": data, "sentiment": sentiment.analyze(data.text)});
            });
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json({tweets: Array.from(tweetsMap)});
            return res;
        })
        .catch(error => res.send(error));
});
module.exports.handler = serverless(app);
