const pg = require('pg')
var mongoose = require('mongoose');

const client = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'testdb',
    password: 'meetup',
    port: 5432,
})
client.connect()

var Schema = mongoose.Schema;

var CompanySchema = new Schema({
    title: {type: String, required: true},
    person: { type: Schema.ObjectId, ref: 'Person' },
    leadership_url: {type: String, required: true},
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
