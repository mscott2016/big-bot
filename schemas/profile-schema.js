
 const { Mongoose } = require("mongoose"); 
 const  mongoose  = require("mongoose");

 const reqString = {
     type: String,
     required: true
 }

const levelSchema =  new mongoose.Schema({
  userID: { type: String },
  guildID: { type: String },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: new Date() },
  invites: {type: Number, default: 0 },
  inviter: {type: String, default: "undefined" },
  invCount: { type: [String], default: [] }
});

//  const profileSchema = Mongoose.Schema({
//      guildId: reqString,
//      userId: reqString,
//      coins: {
//          type: Number,
//          required: true
        
//      }
//  });

 module.exports = mongoose.model('levels', levelSchema);