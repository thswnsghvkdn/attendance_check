const mysql = require('mysql2')
const express = require('express')
var app = express()
const bodyparser = require('body-parser')
const excel = require('exceljs')
const dbuser = require('./config')
const cell = 5
var cors  = require('cors')
app.use(cors())

const month = new Date().getMonth() 
const week = parseInt(new Date().getDate() / 7)


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
        call_make()
    }
})

var obj = {att : [] , date : []}

function make_obj(m , w)
{
    var _date =   m + '-' + w ; // 월 - 주차 
    var str = 'select `'+ _date + '` from attendance' // 해당 컬럼 전체를 가져오기 위한 명령문
    conn.query(str ,function(err, result){
        if(result) {
            var t = []
            for(var j = 0 ; j < result.length ; j++) // json 객체에서 출석정보만을 가져온다.
                t.push(result[j][_date])
            obj.att.push(t) // 출석정보 배열을 객체에 att 에 push 한다.
            obj.date.push(_date) // 해당 날짜를 push한다.

            if(m == 1 && w == 0) console.log(obj) // 1월 0주차에 경우 출력한다.
        }
    })
}

function call_make()
{
    m = month + 1;
    w = week * 2 + 1;
    while(m >= 1) // 1월 까지 줄여가며 반복한다
    {
        make_obj(m , w) // str을 만들기위한 주차와 월을 변경해가며 함수를 호출한다.
        w--;
        if(w < 0) // 0주차 이전으로 갈 경우 이전 달로 보내기
        {
            m--; // 월 감소
            w = 9;
        }
    }
}

var students = '준호 채윤 훈모'
var new_stu = students.split(' ')



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
    res.send("hello");
})



app.listen(5000, () => console.log('sever is running at port no 3000'));
