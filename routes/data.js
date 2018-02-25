var express = require('express');
var router = express.Router();


// Require our controllers.
var company_controller = require('../controllers/companyController'); 
var person_controller = require('../controllers/personController');
var firm_controller = require('../controllers/firmController');


/// BOOK ROUTES ///

// GET data home page.
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

// GET request for company new person
router.get('/company/:id/company_new_person', company_controller.company_new_person_get);

// Post request for company new perosn
router.post('/company/:id/company_new_person', company_controller.company_new_person_post);


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

// GET request to Crate New Company
router.get('/firm/:id/firm_new_company', firm_controller.firm_new_company_get);

// POST request to Create New Company
router.post('/firm/:id/firm_new_company', firm_controller.firm_new_company_post);

// GET request for one Firm.
router.get('/firm/:id', firm_controller.firm_detail);

// GET request for list of all Firm.
router.get('/firms', firm_controller.firm_list);

module.exports = router;
