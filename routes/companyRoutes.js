const express = require('express');
const gascompanyRouter = express.Router();
const gascompanyController = require('../controllers/companyController');
const auth = require('../middleware/auth');


gascompanyRouter.post('/', auth.verifytoken, auth.isAdmin,
gascompanyController.creategasCompany);
gascompanyRouter.get('/', auth.verifytoken, auth.isAdmin, gascompanyController.getgasCompanies);
gascompanyRouter.get('/booked', auth.verifytoken, gascompanyController.getbookedslots);
gascompanyRouter.get('/:companyId', auth.verifytoken, auth.isAdmin, gascompanyController.getgasCompany);
gascompanyRouter.put('/:companyId', auth.verifytoken, auth.isAdmin, gascompanyController.updategasCompany);
gascompanyRouter.delete('/:companyId', auth.verifytoken, auth.isAdmin, gascompanyController.deletegasCompany);
gascompanyRouter.post('/:companyId/book', auth.verifytoken, gascompanyController.bookgasCompanyslot);
module.exports = gascompanyRouter;

