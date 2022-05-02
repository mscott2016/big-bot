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
    console.log(" rjf ") 
    
    const getData = async () => {
      try {
        this.client  = await this.auth.getClient();
        this.googleSheets = google.sheets({ version: "v4", auth: this.client });
        console.log("jjjj")

      } catch (err) {
         console.log(err)
      }
      
  };
  getData();
  console.log(" 2rjf ") ;
  
  // Instance of Google Sheets API
 
  console.log(" 345rjf ") ;
  this.spreadsheetId =  "1QQrEh0ks2FIP-K96acEppBY--P9HYanAoBpZqJyUo9k";
  console.log(" 3rjf ")   ;
  this.questions = [];
    this.questionNumber = 1;
  }
  
  async authr(){
    console.log(" auth2rjf ") ;
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

  async checkOffQuestions(){
   
    
    // Create client instance for auth
   console.log(`the num ${this.questionNumber}`);
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
    let range = `!B${this.questionNumber}`;
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
   
    if (!this.questions[0].includes('done')){
     console.log(this.questions[0][0]);
     this.questionNumber = 1;
     console.log("hhuhu jjnj")
     await this.checkOffQuestions();
     return this.questions[0][0];
    }
    for (var i = this.questions.length - 1; i > 0; i--) {
       if (this.questions[i].includes('done') && i <  this.questions.length - 1){
         console.log(this.questions[i+1][0]);
         this.questionNumber = i+1;
         await this.checkOffQuestions();
         return this.questions[i+1][0];
       }
   }
   }


}
module.exports = GoogleSheet;
