# sheets-db
sheet-db is an ORM for Google Sheet based databases
it is used for automating read write from and to database in Google sheet. so you can focus on making code that works and not dealing with Google Sheets weird matrix array

## Installation
1. Copy the code in sheetdb.gs to a new file.gs in your app script project
2. make sure that you declare the variable `const ss = SpreadsheetApp.openById(yourSheetId) (or getActiveSpreadsheet())` on top of your code (it could be on any file)
3. Done! You can start using it by calling its functions

## Google Sheet Setup
sheets-db requires you to setup your Google Sheet in a specific way, due to the way it works
(it works basically like a normal table / SQL database)

1. Your first row will be your database label. this will be how you tell sheets-db to find something in the database
- Make sure it is formated in all lowercase, with no space. underscore is okay
- if you want your spreadsheet to look pretty, you could set the first row to be bold, and use the freeze row option
2. your first column will always be your database ID
- Currently, ID will be an automaticly incrementing value from 1
- make sure you set the id column format to be number, with no decimal
3. If you want to enforce type, you will have to do it in Google Sheet, through the format cell option
- `Plain Text = String, Number = Number, Any date format = Date, and so on`

Your spreadsheet will look something like this

![Screenshot from 2022-01-29 23-54-07](https://user-images.githubusercontent.com/35835489/151669789-3896b556-9b7a-4990-84ef-4b6439477b4a.png)

## Usage
There will be a Wiki, when i get around to it

## Current status
working : find(), deleteOne()

on Progress : none, i'm lazy

will be worked on : create(), editOne()

I don't think i can do it, but will try : join()

## Why would you use Google sheet as your database?
1. Because it's free and maintaned! (as long as our google overlord permitted us)
2. It's easy to manually edit, you just basically go in there. no SQL Statement!
3. It's easier to use with other non-techie people who might be uncomfortable with typing random SQL statement 
4. You could just throw your accounting guy a Google Sheet link and let them do their accounting wizardy
5. it's fun to see something doing thing they're not typically designed to do
