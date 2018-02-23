var mongoose = require('mongoose');
var moment = require('moment'); // For date handling.

var Schema = mongoose.Schema;

var PersonSchema = new Schema(
    {
    full_name: {type: String, required: true, max: 100},
    linkedin: {type: String, max: 1000},
    bloomberg: {type: String, max: 1000 },
    portfolio_investment_date: { type: Date },
    // linkedin: { type: Date },
    }
  );

// Virtual for person "full" name.
PersonSchema
.virtual('name')
.get(function () {
  return this.linkedin +', '+this.full_name;
});

// Virtual for this person instance URL.
PersonSchema
.virtual('url')
.get(function () {
  return '/data/person/'+this._id
});

PersonSchema
.virtual('lifespan')
.get(function () {
  var lifetime_string='';
  if (this.portfolio_investment_date) {
      lifetime_string=moment(this.portfolio_investment_date).format('MMMM Do, YYYY');
      }
  lifetime_string+=' - ';
  if (this.linkedin) {
      lifetime_string+=moment(this.linkedin).format('MMMM Do, YYYY');
      }
  return lifetime_string
});

PersonSchema
.virtual('portfolio_investment_date_yyyy_mm_dd')
.get(function () {
  return moment(this.portfolio_investment_date).format('YYYY-MM-DD');
});

PersonSchema
.virtual('linkedin_yyyy_mm_dd')
.get(function () {
  return moment(this.linkedin).format('YYYY-MM-DD');
});

// Export model.
module.exports = mongoose.model('Person', PersonSchema);
