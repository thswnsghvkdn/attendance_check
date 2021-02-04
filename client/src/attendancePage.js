
import React from 'react'
import Excel from 'exceljs'
import Blob from 'blob'
import fs from 'fs'

  var workbook = new Excel.Workbook()

  /*
  fs.readFile('sample.xlsx', 'utf8' , function(err, data){

  })
  .then(data => {
    workbook.xlsx.load(data.buffer)
    .then(console.log('downloaded'))
    .catch()
  }) .catch()
 */
  /*
  workbook.xlsx.readFile("sample.xlsx")
  .then(function(){
    console.log('loaded')
  })
  .catch((function(){
    console.log('err')
  }))
  */
  

function AttendancePage() {
    function saveFile(){
      console.log('event 발생')


      /*
      workbook.xlsx.readFile("./sample.xlsx")
      .then(function(){
        console.log('save 발생')
          workbook.xlsx.writeBuffer().then(function (data) {
            const blob = new Blob([data],
              { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = 'download.xls';
            anchor.click();
            window.URL.revokeObjectURL(url);
          });
        })
        .catch(function(){
          debugger
          console.log('err')
        })
      */
    }
  return (
    <div className="attendace">

    </div>
  );
}

export default AttendancePage;

