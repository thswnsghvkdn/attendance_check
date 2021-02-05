const mysql = require('mysql2')
const express = require('express')
var app = express()
const bodyparser = require('body-parser')
const excel = require('exceljs')
const dbuser = require('./config')
const cell = 5

const month = new Date().getMonth() 
const week = parseInt(new Date().getDate() / 7)

var obj = {att : [] , date : []}

app.use(bodyparser.json())


var conn = mysql.createConnection({
    host : 'localhost' ,
    user : dbuser.user ,
    password : dbuser.password ,
    database : 'att'
});

conn.connect( (err) =>{
    if(err)
        console.log(err)
    else {
        console.log('DB connected')
        tt()
    }
})

function recursive(m , w)
{

    var _date =   m + '-' + w ;
    var str = 'select `'+ _date + '` from attendance'
    conn.query(str ,function(err, result){
        if(result) {
            var t = []
            for(var j = 0 ; j < result.length ; j++)
                t.push(result[j][_date])
            obj.att.push(t)
            obj.date.push(_date)
            if(m == 1 && w == 0) console.log(obj)
        }
    })
}

function tt()
{
    m = month + 1;
    w = week * 2 + 1;
    while(m >= 1)
    {
        recursive(m , w, obj)
        w--;
        if(w < 0)
        {
            m--;
            w = 9;
        }
    }
}

var students = '준호 채윤 훈모'
var new_stu = students.split(' ')

function att() {
    for( var i in new_stu){
        var str = 'select * from attendance where name like' + conn.escape('%' + new_stu[i] +'%')
        conn.query(str , function(err, result){
            if(err) ( err => console.log(err))
            if(result.length >= 1) {
                var s = '01'
                var c = 1
                var index = year + '-' + 1 + '-' + 1
                console.log(index)
                console.log(result[2][index])
            }
        })
    }
}

function get_column(){
    var str = 'select name from attendance'
    conn.query(str, function(err, result){
        debugger;
        console.log(result)
        console.log(result[0].name)
        
    })
}

function save() {

    debugger;
    var m = month + 2; // worksheet 번호
    var w = week * 2 + 1;
    var att = []
    var date = []
    while( m <= 1 ) {
        var _date = '`' +  m + '-' + w + '`';
        var str = 'select '+ _date +' from attendance'
        console.log(str)
        conn.query(str , function(err, result){
            if(result) {
                console.log(result)
                if(err) ( err => console.log(err))
                att.push(result[_date])
            }
        })
        // 다음 컬럼을 받는다. 
        w--;
        if(w < 0) // 이전 달로 이동
        {
            w = 9;
            m--
        }
        date.push(_date)
    }
    console.log({ att : att , date : date});
    debugger;
    return({ att : att , date : date});
    
}
app.post('/attendance' , (req, res) => {
    //var students = req.body.students;

    var students = '준호 채윤 훈모'
    var new_stu = students.split(' ')
    
    for( var i in new_stu){
        var str = 'select * from attendance where name like' + conn.escape('%' + new_stu[i] +'%')
        conn.query(str , function(err, result){
            if(err) ( err => console.log(err))
            console.log(result)
        })
    }
})

app.get('/save', (req, res) =>{
    var m = month + 2; // worksheet 번호
    var w = week * 2 + 1;
    var att = []
    var date = []
    while( m <= 1 ) {
        var _date = '`' +  m + '-' + w + '`';
        var str = 'select '+ _date +' from attendance'
        conn.query(str , function(err, result){
            if(result) {
                if(err) ( err => console.log(err))
                att.push(result[_date])
            }
        })
        // 다음 컬럼을 받는다. 
        w--;
        if(w < 0) // 이전 달로 이동
        {
            w = 9;
            m--
        }
        date.push(_date)
    }
    res.send({ att : att , date : date});
})



app.listen(3000, () => console.log('sever is running at port no 3000'));
