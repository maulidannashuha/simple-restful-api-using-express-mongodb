const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

const db = require('./app/models')
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Database connected!')
}).catch((err) => {
    console.log('Cannot connect to the database ', err)
    process.exit()
})

app.get('/', (req, res) => {
    res.json({
        message: "Welcome to my blog"
    })
})

require('./app/routes/post.route')(app)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
