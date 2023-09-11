const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000

var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Registarion Page
const user = require('./routes/register-route')

app.use('/api/register',user)

// Login Page
const login = require('./routes/login-route')

app.use('/api/login',login)

// Home Page
const home = require('./routes/home-route')

app.use('/api/home',home)

// Map Page
const map = require('./routes/map-route')

app.use('/api/map',map)


app.listen(port,() => {
    console.log(`Example app listening on port ${port}`)
})