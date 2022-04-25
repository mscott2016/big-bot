const { google } = require("googleapis");
const fs = require('fs');
const readline = require('readline');
const {GoogleAuth} = require('google-auth-library');
const { sheets } = require("googleapis/build/src/apis/sheets");
// class GoogleSheet {

//   constructor(){
//     const j = 5;
//   }
  
// }
// module.exports = GoogleSheet;
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

async function hh(){
 
  
  // Create client instance for auth
  const client = await auth.getClient();
  
  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });
  
  const spreadsheetId =  "1QQrEh0ks2FIP-K96acEppBY--P9HYanAoBpZqJyUo9k";
  
  const find = await sheets.spreadsheets.value.get({
    auth,
    spreadsheetId,
    range: "Sheet1!A:A"
  });  
  console.log(find)
}
hh(); const auth = new GoogleAuth({
    keyFile: "sheets.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });