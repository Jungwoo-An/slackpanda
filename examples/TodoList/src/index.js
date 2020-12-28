const { createClient } = require('../dist/vue');
const { SlackAdapter } = require('../dist/slack');

const TodoList = require('./TodoList.vue');

const adapter = new SlackAdapter({
  apiToken: process.env.SLACK_API_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const client = createClient({
  adapter,
});

client.sendMessage(TodoList, '#test');
