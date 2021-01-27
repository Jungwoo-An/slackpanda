const express = require('express');
const bodyParser = require('body-parser');

const { createClient } = require('@slackpanda/vue');
const { SlackAdapter } = require('@slackpanda/slack');

const PingPong = require('./PingPong.vue');

const app = express();

const adapter = new SlackAdapter({
  apiToken: process.env.SLACK_API_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const client = createClient({
  adapter,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.post('/ping', (req, res) => {
  const { channel_id } = req.body;

  client.sendMessage(PingPong, channel_id);

  res.status(200).send('');
});

app.listen(8081, (err) => {
  if (err) {
    throw err;
  }

  console.log('Listen on port 8080');
});
