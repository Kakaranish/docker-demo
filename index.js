const express = require('express');
const moment = require('moment');

const app = express();

app.use("*", (_, res) => {
    res.send(`${moment.utc().format("YYYY-MM-DD hh:mm:ss")} | Hello world\n`);
});

const port = 8080;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});