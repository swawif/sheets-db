const spreadSheetId = key(); // change with your own ssId
const ss = SpreadsheetApp.openById(spreadSheetId);

//create

//edit

//delete

function find(targetSheet, query) {
  if (Object.keys(query).length === 0) {
    return false;
  }
  let sheet = ss.getSheetByName(targetSheet);

  let searchKey = Object.keys(query);
  let searchData = Object.values(query);

  let colWidth = sheet.getLastColumn();
  let rowHeight = sheet.getLastRow();

  // get all the database label, store later for use as object key
  let dbKey = sheet.getRange(1, 1, 1, colWidth).getValues();
  dbKey = dbKey[0];

  // compare dbKey vs searchKey
  let matchingColumn = [];
  for (let i = 0; i < searchKey.length; i++) {
    for (let a = 0; a < dbKey.length; a++) {
      if (dbKey[a] === searchKey[i]) {
        matchingColumn.push(a + 1); //[3,6]
      }
    }
  }

  // get row array that corresponds to the matching column
  let rowCollection = [];
  for (let b = 0; b < matchingColumn.length; b++) {
    let tempArr = [];
    let rowVal = sheet.getRange(2, matchingColumn[b], rowHeight - 1, 1).getValues();
    rowVal.forEach(arr => {
      tempArr.push(arr[0]);
    });
    rowCollection.push(tempArr);
    Logger.log(tempArr);
    Logger.log(rowCollection);
  };

  // match rowCollection with the searchData
  // collect matching row between first array
  // collect matching row between second array
  // see both array, which has 

  let matchingRow = []
  for (let c = 0; c < rowCollection.length; c++) {
    let tempArr = [];
    for (let d = 0; d < rowCollection[c].length; d++) {
      Logger.log(`c = ${c}, d = ${d}, data = ${rowCollection[c][d]} search = ${searchData[c]}`);
      Logger.log(rowCollection[c].includes(searchData[c], d));
      if (rowCollection[c][d] === searchData[c]) {
        tempArr.push(d + 1);
      }
    }
    matchingRow.push(tempArr);
  }
  Logger.log(matchingRow);

  if (matchingRow[0][0] === undefined) { return false }

  // match matchingRow[0.1.2]
  // thank you AllWorkNoPlay - https://stackoverflow.com/questions/70803864/

  let m1 = matchingRow[0].slice();
  let mOther = matchingRow.slice(1);

  let intersect = m1.filter((element) => mOther.every((other) => other.indexOf(element) > -1));

  // now return the result

  let result = {
    "index": intersect,
    "result": []
  };
  for (let e = 0; e < intersect.length; e++) {
    let tempArr = sheet.getRange(intersect[e] + 1, 1, 1, colWidth).getValues();
    tempArr = tempArr[0];
    let tempObj = {};
    for (let f = 0; f < dbKey.length; f++) {
      tempObj[dbKey[f]] = tempArr[f];
    }
    result.result.push(tempObj);
  }
  Logger.log(result);
  return result;
}