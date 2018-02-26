var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FirmSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {type: String, required: true, min: 3, max: 100},
    companyInFirm: [{type: Schema.Types.ObjectId, ref: 'Company' }]
});

// Virtual for this firm instance URL.
FirmSchema
.virtual('url')
.get(function () {
  return '/data/firm/'+this._id;
});

// Export model.
module.exports = mongoose.model('Firm', FirmSchema);
