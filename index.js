require("dotenv").config();
const { TwitterClient } = require("twitter-api-client");
const cron = require('node-cron');
const axios = require("axios");
const twitterClient = new TwitterClient({
  apiKey: process.env.TWITTER_API_KEY,
  apiSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});
var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
  cron.schedule('* * * * *', function() {
  console.log('running a task every minute');

axios
  .get("https://fcd.terra.dev/v1/circulatingsupply/luna")
  .then((response) => {
    // console.log(response.data);
    const data = response.data ? response.data : {};
    let tweet;
    // if (data.Events && data.Events.length) {
    //tweet the first event in the array
    let mkp = parseInt(data);
    tweet = "$LUNA 🌕  Market Cap is " + formatter.format(mkp);
    // } else {
    //   tweet = "Nothing happened today :)";
    // }
    // console.log(tweet);
    //TODO send the tweet
  
    twitterClient.tweets
      .statusesUpdate({
        status: tweet,
      })
      .then((response) => {
        console.log("Tweeted!");
      })
      .catch((err) => {
        console.error(err);
      });
  })
  .catch((err) => {
    console.error(err);
  });
});