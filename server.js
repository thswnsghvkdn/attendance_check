const mysql = require('mysql2')
const express = require('express')
var app = express()
const bodyparser = require('body-parser')
const excel = require('exceljs')


app.use(bodyparser.json())

app.get('/attendance' , (req, res) => {
    var person = req.body;
    
})