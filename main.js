/*import { utils } from './js-xlsx-master/xlsx.js';
import { Props } from './js-xlsx-master/dist/xlsx';
import { SheetNames } from './js-xlsx-master/dist/xlsx';
import { write } from './js-xlsx-master/dist/xlsx';
*/
var total = 0;

var request = require('request');
function getData(sbd) {
  return new Promise(function (resolve, reject) {
    request.get({
      uri: 'https://diemthi.tuoitre.vn/kythi2019.html?FiledValue=0' + sbd + '&MaTruong=i10hn'
    }, (error, response, body) => {
      if (error) {
        return reject(sbd)
      }

      let data = JSON.stringify(body);
      let tmpArray = [];
      // tmpArray.push(total);
      tmpArray.push(sbd);
      let tmpData = data.split('</td>');
      if (tmpData.length > 3) {
        for (let i = 0; i < tmpData.length; i++) {
          let tag = tmpData[i];
          if (tag.indexOf('color-red') !== -1) {
            //tag = tag.match(/\d/g);
            tag = tag.replace("</tr><tr>", "");
            tag = tag.replace("<td class=\\\"color-red\\\">", "");
            tag = tag.replace(";", "");
            //      tag = tag.join("");
            //tag = tag.slice(0, 2) + '.' + tag.slice(2, tag.length);
            tmpArray.push(tag);
          }
        }
        // console.log(tmpArray)
        resolve(3)
      }
    })
  })

}

function getFullData(from, to) {
  let data = []
  for (let i = from; i <= to; i++) {
    data[data.length] = getData(i)
    // data[data.length] = Promise.resolve(3)
  }
  console.log(data)
  Promise.all(data).then(console.log).catch(console.log)
}

function getDataByStep(from, to, step) {
  if (from > to) {
    return
  }
  console.log(":WTF1")
  var data_p = getFullData(from, from + step);
  
}

getDataByStep(10000, 12000, 20);
//console.log(total);