const line = require('@line/bot-sdk');
const express = require('express');
const config = require('./config.json');
var mysql = require('mysql');

//----- begin stuff for LINE -v-
const client = new line.Client(config);

const app = express();

// webhook callback
app.post('/webhook', line.middleware(config), (req, res) => {
  // req.body.events should be an array of events
  if (!Array.isArray(req.body.events)) {
    return res.status(500).end();
  }
  // handle events separately
  Promise.all(req.body.events.map(event => {
    console.log("get event, text:",event.message.text);
    // this is only for LINE webhook verification from LINE developer control panel
    if (event.replyToken === '00000000000000000000000000000000' ||
      event.replyToken === 'ffffffffffffffffffffffffffffffff') {
      return;
    }
    return handleEvent(event);
  }))
    .then(() => res.end())
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// simple reply function
const replyText = (token, texts) => {
  texts = Array.isArray(texts) ? texts : [texts];
  return client.replyMessage(
    token,
    texts.map((text) => ({ type: 'text', text }))
  );
};

// callback function to handle a single event
function handleEvent(event) {
  switch (event.type) {
    case 'message':
      const message = event.message;
      switch (message.type) {
        case 'text':
          return handleText(message, event.replyToken);
        case 'image':
          return handleImage(message, event.replyToken);
        case 'video':
          return handleVideo(message, event.replyToken);
        case 'audio':
          return handleAudio(message, event.replyToken);
        case 'location':
          return handleLocation(message, event.replyToken);
        case 'sticker':
          return handleSticker(message, event.replyToken);
        default:
          throw new Error(`Unknown message: ${JSON.stringify(message)}`);
      }

    case 'follow':
      return replyText(event.replyToken, 'Got followed event');

    case 'unfollow':
      return console.log(`Unfollowed this bot: ${JSON.stringify(event)}`);

    case 'join':
      return replyText(event.replyToken, `Joined ${event.source.type}`);

    case 'leave':
      return console.log(`Left: ${JSON.stringify(event)}`);

    case 'postback':
      let data = event.postback.data;
      return replyText(event.replyToken, `Got postback: ${data}`);

    case 'beacon':
      const dm = `${Buffer.from(event.beacon.dm || '', 'hex').toString('utf8')}`;
      return replyText(event.replyToken, `${event.beacon.type} beacon hwid : ${event.beacon.hwid} with device message = ${dm}`);

    default:
      throw new Error(`Unknown event: ${JSON.stringify(event)}`);
  }
}

function handleText(message, replyToken) {
  // insert text to local DATABASE
/*  sqlString = 'INSERT IGNORE INTO news ()'
  sqlcon.query(sqlString, function (err, result) {
      if (err){
        res.send("Error:" + err)
      }
      res.send("Result: " + result);
    });*/
//  return replyText(replyToken, "🛑 According to my knowledge, this news seems to be ⚠️ FAKE ⚠️ . Using your own discretion and further research are strongly suggested. ");
  return replyText(replyToken, "⭐️ 🆗 ⭐️ This news seems to be ⭐️ REAL ⭐️. There are a lot of verifiers think that this is real.");
  //return replyText(replyToken, "🛑 I think this is a ⚠️ FAKE ⚠️ news. There are a lot of verifiers think that this is fake. Using your own discretion and further research are strongly suggested.");

}

function handleImage(message, replyToken) {
  return replyText(replyToken, 'Got Image');
}

function handleVideo(message, replyToken) {
  return replyText(replyToken, 'Got Video');
}

function handleAudio(message, replyToken) {
  return replyText(replyToken, 'Got Audio');
}

function handleLocation(message, replyToken) {
  return replyText(replyToken, 'Got Location');
}

function handleSticker(message, replyToken) {
  return replyText(replyToken, 'Got Sticker');
}
//-------end line stuff -w-
var sqlcon = mysql.createConnection({
  host: "localhost",
  user: "owlery",
  password: "owlerypw23",
  database : 'owlery_db',
  insecureAuth : true
});

sqlcon.connect(function(err) {
  if (err) throw err;
  console.log("Connected to mysql database");
});

app.get('/', function (req, res) {
  res.send('owlery main page. There is nothing here yet. It should be something here soon!!! ((o(´∀｀)o))')
})
app.get('/test', function (req, res) {
  sqlString = 'SELECT * FROM news'
  sqlcon.query(sqlString, function (err, result) {
      if (err){
        res.send("Error:" + err)
      }
      res.send("Result: " + result);
    });
})

const port = config.port;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
