const { google } = require("googleapis");
const fs = require('fs');
const readline = require('readline');
const {GoogleAuth} = require('google-auth-library');

const docs = require('@googleapis/docs');
const { typeOf } = require("mathjs");
class GoogleSheet {
  
  constructor(){
    this.SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    this.auth = new docs.auth.GoogleAuth({
      keyFile: "sheets.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    this.client = await this.auth.getClient();
  
  // Instance of Google Sheets API
  this.googleSheets = google.sheets({ version: "v4", auth: client });
  
  this.spreadsheetId =  "1QQrEh0ks2FIP-K96acEppBY--P9HYanAoBpZqJyUo9k";
    this.questions = [];
    this.questionNumber = 1;
  }
  
  async  readQuestions(){
    
    const find = await this.googleSheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: "!A1:B"
    });  
    console.log(find.data.values.length)
    this.questions = find.data.values;
    return find.data.values;
  }

  async checkOffQuestions(questionNumber){
   
    
    // Create client instance for auth
   
    let values = [
      [
        "done"
      ],
      // Additional rows ...
    ];
    const requestBody = {
      values,
    };
    let valueInputOption = 'USER_ENTERED';
    let range = `!B${questionNumber}`;
    const find = await this.googleSheets.spreadsheets.values.update({
      spreadsheetId: this.spreadsheetId,
      range,
      valueInputOption,
      requestBody,
    }, (err, result) => {
      if (err) {
        // Handle error
        console.log(err);
      } else {
        console.log('%d cells updated.', result.updatedCells);
      }
    });
    console.log(find)
  }

  async  getLastQuestion(){
    q_s = await this.readQuestions();
    if (!q_s[0].includes('done')){
     console.log(q_s[0][0]);
     this.questionNumber = 0;
     return q_s[0][0];
    }
    for (var i = q_s.length - 1; i >= 0; i--) {
       if (q_s[i].includes('done') && i <  q_s.length - 1){
         console.log(q_s[i+1][0]);
         this.questionNumber = i+1;
         return q_s[i+1][0];
       }
   }
   }


}
module.exports = GoogleSheet;
