var mongoose = require('mongoose');
var moment = require('moment'); // For date handling.

var Schema = mongoose.Schema;

var PersonSchema = new Schema(
    {
    full_name: {type: String, required: true, max: 100},
    linkedin: {type: String, max: 1000},
    bloomberg: {type: String, max: 1000 },
    executive_start_date: { type: Date },
    }
  );

// Virtual for this person instance URL.
PersonSchema
.virtual('url')
.get(function () {
  return '/data/person/'+this._id
});

PersonSchema
.virtual('executive_start_date_yyyy_mm_dd')
.get(function () {
  return moment(this.start_date).format('YYYY-MM-DD');
});


// Export model.
module.exports = mongoose.model('Person', PersonSchema);
