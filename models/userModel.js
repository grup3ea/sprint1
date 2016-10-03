var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var userSchema = new Schema({
    username: { type: String },
    password: { type: String },
    mail:   { type: String },
    description:   { type: String },
    publications: [{
      title: { type: String },
      date: { type: Date },
      content: { type: String }
    }]
})
module.exports = mongoose.model('userModel', userSchema);
