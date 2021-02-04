const mysql = require('mysql2')
const express = require('express')
var app = express()
const bodyparser = require('body-parser')
const excel = require('exceljs')
const dbuser = require('./config')
const cell = 5



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
    else 
        console.log('DB connected')
})


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

function save(sheet , cell) {



    while(1)
    {
        var index
        var check_cell =  year + '-' + start_sheet + '-' + start_cell // 다음달로 넘어가기 위해
        conn.query(check_cell, function(err, result){
            if(!result) {
                start_sheet++;
                start_cell = 16    
            }
        })    
        index = year + '-' + start_sheet + '-' + start_cell
        var str = 'select * from attendance where name like' + conn.escape('%' + new_stu[i] +'%')
        conn.query(str , function(err, result){
            if(err) ( err => console.log(err))
            console.log(result)
        })
    }
    

}

att()
app.get('/attendance' , (req, res) => {
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

app.listen(3000, () => console.log('sever is running at port no 3000'));
