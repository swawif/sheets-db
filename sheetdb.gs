// ﷽

// if you already have ss declared elsewhere, delete these two lines
const spreadSheetId = key(); // change with your own ssId
const ss = SpreadsheetApp.openById(spreadSheetId);

//create
function createOne(targetSheet, query){
  //get sheet infos
  let sheet = ss.getSheetByName(targetSheet);
  let colWidth = sheet.getLastColumn();
  let rowHeight = sheet.getLastRow();

  // get all the database label, store later for use as object key
  let dbKey = sheet.getRange(1, 1, 1, colWidth).getValues();
  dbKey = dbKey[0];

  let writeKeys = Object.keys(query);
  let writeValues = Object.values(query);

  let writeArray = [[]];
  let newId = Number(sheet.getRange(rowHeight,1).getValue())+1;
  writeArray[0].push(newId);

  let tempArray = []
  let temp
  dbKey.forEach((db,a) => {
    // Logger.log(`Checking for ${db}`);
    writeKeys.forEach((key,i) => {
      if(key == db){
        // Logger.log(`Match with ${db} at index ${i}`);
        temp = i
      }
    });
    tempArray.push(temp);
    temp = undefined
  });
  tempArray.shift();
  // Logger.log(tempArray);

  tempArray.forEach(val => {
    if(val != null){
    // Logger.log(`Pushing ${writeValues[val]}`);
    writeArray[0].push(writeValues[val]);
    } else {
      writeArray[0].push("");
    }
  });

  // Logger.log(writeArray);
  sheet.getRange(rowHeight+1,1,1,writeArray[0].length).setValues(writeArray);

}

//edit


function deleteOne(targetSheet, itemId) {
  let sheet = ss.getSheetByName(targetSheet);
  let deleteItem = find(targetSheet, { id: itemId });

  if (!deleteItem) { 
    Logger.log(`Cannot find database id ${itemId}`);
    return false 
  }

  sheet.deleteRow(deleteItem.index[0]);
  Logger.log(`Successfully deleted row ${deleteItem.index[0]}`);
  return true;
}

function find(targetSheet, query) {
  if (Object.keys(query).length === 0) {
    return findAll(targetSheet);
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
        matchingColumn.push(a + 1);
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
  };

  // match rowCollection with the searchData
  // collect matching row between first array
  // collect matching row between second array
  // see both array, which has 

  let matchingRow = []
  for (let c = 0; c < rowCollection.length; c++) {
    let tempArr = [];
    for (let d = 0; d < rowCollection[c].length; d++) {
      if (rowCollection[c][d] === searchData[c]) {
        tempArr.push(d + 1);
      }
    }
    matchingRow.push(tempArr);
  }

  // If no matches found, return false
  if (matchingRow[0].length === 0) { 
    Logger.log(`No Match found for ${query}`);
    return false
    }

  // thank you AllWorkNoPlay - https://stackoverflow.com/questions/70803864/

  let m1 = matchingRow[0].slice();
  let mOther = matchingRow.slice(1);

  let intersect = m1.filter((element) => mOther.every((other) => other.indexOf(element) > -1));

  // increment all result in intersect to match to row numbering
  for (let g = 0; g < intersect.length; g++) {
    intersect[g] = intersect[g]+1;
  }

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

function findAll(targetSheet){
  let sheet = ss.getSheetByName(targetSheet);
  let colWidth = sheet.getLastColumn();
  let rowHeight = sheet.getLastRow();

  // get all the database label, store later for use as object key
  let dbKey = sheet.getRange(1, 1, 1, colWidth).getValues();
  dbKey = dbKey[0];

  let content = sheet.getRange(2,1,rowHeight-1,colWidth).getValues();

  let array = [];
  let tempObj = {};

  for (i=0 ; i<content.length; i++ ) {
    for(a=0;a<dbKey.length;a++){
      tempObj[dbKey[a]] = content[i][a];
      tempObj["rowLocation"] = i+2; 
    }
    array.push(tempObj);
    tempObj = {}
  }

  return array;
}