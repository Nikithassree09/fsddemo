const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name: String,
    location: String,
    applicants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    
});

module.exports = mongoose.model('Gas company', CompanySchema, 'gas company');