const express = require('express');
const moment = require('moment');
const fs = require('fs');
const redis = require("redis");

const app = express();
const redisClient = redis.createClient({
    port: 6379,
    host: "localhost"
});

app.get('/log', (req, res) => {
    const logsPath = "./logs/logs.txt";
    const data = `${moment.utc().format("YYYY-MM-DD hh:mm:ss")} | /log called\n`

    fs.appendFile(logsPath, data, err => {
        if (err) console.log(err);
    });

    console.log("Processed /log request")
    res.send("Log appended\n");
});

app.get("/redis", (req, res) => {
    let now = moment.utc().format("YYYY-MM-DD hh:mm:ss");
    redisClient.set("last_access", now, redis.print);

    res.send(`last_access set to '${now}'\n`);
});

app.use("*", (_, res) => {
    res.send(`${moment.utc().format("YYYY-MM-DD hh:mm:ss")} | Hello world\n`);
});

const port = 8080;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});