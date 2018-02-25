var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var CompanySchema = new Schema({
    title: {type: String, required: true},
    portfolio_investment_date: { type: Date },
    person: { type: Schema.ObjectId, ref: 'Person' },
    leadership_url: {type: Schema.Types.Mixed, required: true},
    firm: [{ type: Schema.ObjectId, ref: 'Firm' }]
});

// Virtual for this company instance URL.
CompanySchema
.virtual('url')
.get(function () {
  return '/data/company/'+this._id;
});

// PersonSchema
//     .virtual('portfolio_investment_date_yyyy_mm_dd')
//     .get(function () {
//         return moment(this.portfolio_investment_date).format('YYYY-MM-DD');
//     });

// Export model.
module.exports = mongoose.model('Company', CompanySchema);
