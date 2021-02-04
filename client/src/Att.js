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
          debugger;
          console.log(wb);
          var st = [1,0,1,0,1,0,1,0,1];
          for(var i = 0 ; i < st.length ; i++){
              if(st[i] == 1){
               wb.worksheets[3].getRow(i + 5).getCell(16).value = 1;
              }
          }
          debugger;
          wb.xlsx.writeBuffer().then(function (data) {
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
    }
  }
  render() {
    return (
      <div className="Att">
        <input type="file" multiple onChange={this.fileHandler}/>
      </div>
    );
  }


}

export default Att;