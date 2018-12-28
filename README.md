Based on this tutorial (except the exposing the localhost to public part)
https://medium.com/linedevth/line-bot-101-447e427d62c7

# Owlery
Line chat bot for verifying fake news! There are two part in total: line messaging API backend using express.js and front end using react.js

## How it work
1) Start express server on port 3000 using
``` npm start ```
2) Expose the server to https://owlery.localtunnel.me by running
``` ./startlt ```

# Install
Clone and run
```
npm install
```
Modify `config.json`
```json
{
  "port" : "3000",
  "channelAccessToken": "YOUR_CHANNEL_ACCESS_TOKEN",
  "channelSecret": "YOUR_CHANNEL_SECRET"
}
```
Run
```
npm start
```
then you can access [http://localhost:3000](http://localhost:3000)

Use local tunnel [https://github.com/localtunnel/localtunnel]to expose your local url using the startlt.sh script
```
./startlt
```

