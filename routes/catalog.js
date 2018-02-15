var express = require('express');
var router = express.Router();


// Require our controllers.
var company_controller = require('../controllers/companyController'); 
var person_controller = require('../controllers/personController');
var firm_controller = require('../controllers/firmController');
var company_instance_controller = require('../controllers/companyinstanceController');


/// BOOK ROUTES ///

// GET catalog home page.
router.get('/', company_controller.index);  

// GET request for creating a Company. NOTE This must come before routes that display Company (uses id).
router.get('/company/create', company_controller.company_create_get);

// POST request for creating Company.
router.post('/company/create', company_controller.company_create_post);

// GET request to delete Company.
router.get('/company/:id/delete', company_controller.company_delete_get);

// POST request to delete Company.
router.post('/company/:id/delete', company_controller.company_delete_post);

// GET request to update Company.
router.get('/company/:id/update', company_controller.company_update_get);

// POST request to update Company.
router.post('/company/:id/update', company_controller.company_update_post);

// GET request for one Company.
router.get('/company/:id', company_controller.company_detail);

// GET request for list of all Company.
router.get('/companys', company_controller.company_list);

/// AUTHOR ROUTES ///

// GET request for creating Person. NOTE This must come before route for id (i.e. display person).
router.get('/person/create', person_controller.person_create_get);

// POST request for creating Person.
router.post('/person/create', person_controller.person_create_post);

// GET request to delete Person.
router.get('/person/:id/delete', person_controller.person_delete_get);

// POST request to delete Person
router.post('/person/:id/delete', person_controller.person_delete_post);

// GET request to update Person.
router.get('/person/:id/update', person_controller.person_update_get);

// POST request to update Person.
router.post('/person/:id/update', person_controller.person_update_post);

// GET request for one Person.
router.get('/person/:id', person_controller.person_detail);

// GET request for list of all Persons.
router.get('/persons', person_controller.person_list);


/// GENRE ROUTES ///

// GET request for creating a Firm. NOTE This must come before route that displays Firm (uses id).
router.get('/firm/create', firm_controller.firm_create_get);

// POST request for creating Firm.
router.post('/firm/create', firm_controller.firm_create_post);

// GET request to delete Firm.
router.get('/firm/:id/delete', firm_controller.firm_delete_get);

// POST request to delete Firm.
router.post('/firm/:id/delete', firm_controller.firm_delete_post);

// GET request to update Firm.
router.get('/firm/:id/update', firm_controller.firm_update_get);

// POST request to update Firm.
router.post('/firm/:id/update', firm_controller.firm_update_post);

// GET request for one Firm.
router.get('/firm/:id', firm_controller.firm_detail);

// GET request for list of all Firm.
router.get('/firms', firm_controller.firm_list);


/// BOOKINSTANCE ROUTES ///

// GET request for creating a CompanyInstance. NOTE This must come before route that displays CompanyInstance (uses id).
router.get('/companyinstance/create', company_instance_controller.companyinstance_create_get);

// POST request for creating CompanyInstance.
router.post('/companyinstance/create', company_instance_controller.companyinstance_create_post);

// GET request to delete CompanyInstance.
router.get('/companyinstance/:id/delete', company_instance_controller.companyinstance_delete_get);

// POST request to delete CompanyInstance.
router.post('/companyinstance/:id/delete', company_instance_controller.companyinstance_delete_post);

// GET request to update CompanyInstance.
router.get('/companyinstance/:id/update', company_instance_controller.companyinstance_update_get);

// POST request to update CompanyInstance.
router.post('/companyinstance/:id/update', company_instance_controller.companyinstance_update_post);

// GET request for one CompanyInstance.
router.get('/companyinstance/:id', company_instance_controller.companyinstance_detail);

// GET request for list of all CompanyInstance.
router.get('/companyinstances', company_instance_controller.companyinstance_list);


module.exports = router;
