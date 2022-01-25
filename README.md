# sheets-db
sheet-db is an ORM for Google Sheet based databases
it is used for automating read write from and to database in Google sheet. so you don't have to deal with Google Sheets weird matrix array

## Installation
1. Copy the code in sheetdb.gs to a new file.gs in your app script project
2. make sure that you declare the variable `ss` to a `SpreadsheetApp.openBy` on top of your code (openById or activeSpreadsheet should work fine)
3. Done! you can start using it

## Google Sheet Setup


## Usage
### Read from database
find(sheetName , {searchObject});
returns with array of matching result

#### sheetName
This is the sheet that you want the query to be run on

#### {searchObject}
this is your query it must be structured 
