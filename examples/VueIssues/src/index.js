const { createClient } = require('@slackpanda/vue');
const { SlackAdapter } = require('@slackpanda/slack');

const VueIssues = require('./VueIssues.vue');

const adapter = new SlackAdapter({
  apiToken: process.env.SLACK_API_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const client = createClient({
  adapter,
});

client.sendMessage(VueIssues, '#test');
