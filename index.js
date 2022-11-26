const express = require('express')
const app = express()
const port = process.env.PORT || 5300
const bodyParser = require('body-parser')

app.use(bodyParser.json({ limit: '200mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }))
app.use(express.json());



const routes = require('./settings/routes')
routes(app)

app.listen(port, () => {
    console.log(`Server run ${port}`);
})