Based on this tutorial (except the exposing the localhost to public part)
https://medium.com/linedevth/line-bot-101-447e427d62c7

# Owlery
Line chat bot for verifying fake news! There are two part in total: line messaging API backend using express.js and front end using react.js


# Install
1)Clone and run this command
```
npm install
```
2)Modify `config.json`
```json
{
  "port" : "3000",
  "channelAccessToken": "YOUR_CHANNEL_ACCESS_TOKEN",
  "channelSecret": "YOUR_CHANNEL_SECRET"
}
3) Install local tunnel
Use localtunnel [https://github.com/localtunnel/localtunnel]to expose your local url using the startlt.sh script so LINE message API would be able to communicate with the server
run this to install local tunnel
```
npm install localtunnel
```

## How to run
1) Start express server on port 3000 using
``` npm start ```
2) Expose the server to https://owlery.localtunnel.me by running
``` ./startlt ```


