var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CompanySchema = new Schema({
    title: {type: String, required: true},
    person: { type: Schema.ObjectId, ref: 'Person' },
    summary: {type: String, required: true},
    isbn: {type: String, required: true},
    firm: [{ type: Schema.ObjectId, ref: 'Firm' }]
});

// Virtual for this company instance URL.
CompanySchema
.virtual('url')
.get(function () {
  return '/catalog/company/'+this._id;
});

// Export model.
module.exports = mongoose.model('Company', CompanySchema);
