import React from 'react'
import Excel from 'exceljs'



// var data = wb.worksheets[2].columns[15].values
/*function check() {
    var st = [1,0,1,0,1,0,1,0,1];
    for(var i = 0 ; i < st.length ; i++){
        if(st[i] == 1){
        var data = wb.worksheets[2].columns[15].values[i + 5] = 1;
        }
    }
}
*/




function savefile( wb) // 서버에서 넘어온 객체를 가지고 엑셀을 수정 
{
  var res ={ att:
    [ [ 1, null, 1, 1 ],
      [ null, 1, null, 1 ],
      [ null, null, 1, 1 ],
      [ 1, null, 1, 1 ],
      [ null, 1, null, 1 ],
      [ 1, null, 1, 1 ] ],
   date: [ '2-1', '2-0', '1-3', '1-2', '1-1', '1-0' ] };
    for(var i = 0 ; i < res.date.length ; i++)
    {
        var date = res.date[i]; // '2-1' 과 같이 월과 주가 객체로 전달된다.
        var m = Number(date[0])
        var c = Number(date[2])
        for(var j = 0 ; j < res.att.length ; j++){
            {
                for(var k = 0 ; k < res.att[j].length ; k++){
                    if(res.att[j][k] === 1){
                      wb.worksheets[m + 2].getRow(5 + k).getCell(16 + c).value = 1;
                      debugger;
                     }
                }
            }
        }
    }
}


class Att extends React.Component {
state = {file : null}
fileHandler = (e) => {
	const files = e.target.files[0];
  	this.setState({
    	files: files
    })
    const wb = new Excel.Workbook();
    const reader = new FileReader()

    reader.readAsArrayBuffer(files)
    reader.onload = () => {
      const buffer = reader.result;
      wb.xlsx.load(buffer).then(data => {
          
        savefile( wb); // 받아온 엑셀에 수정하기

          wb.xlsx.writeBuffer().then(function (data) {
            const blob = new Blob([data],
              { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = 'download.xlsx';
            anchor.click();
            window.URL.revokeObjectURL(url);
          });
      })
    }
  }
  date = (e) =>{
      const d = e.target.date;
      debugger;
  }
  

  render() {
    return (
      <div className="Att">
        <input type="file" multiple onChange={this.fileHandler}/>
        <input type = "date" id = "myDate" multiple onChage={this.date} />
      </div>
    );
  }


}

export default Att;