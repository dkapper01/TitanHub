var Person = require('../models/person')
var async = require('async')
var Company = require('../models/company')

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all Persons.
exports.person_list = function (req, res, next) {

    Person.find()
        .sort([['linkedin', 'ascending']])
        .exec(function (err, list_persons) {
            if (err) { return next(err); }
            // Successful, so render.
            res.render('person_list', { title: 'List of Executives', person_list: list_persons });
        })

};

// Display detail page for a specific Person.
exports.person_detail = function (req, res, next) {

    async.parallel({
        person: function (callback) {
            Person.findById(req.params.id)
                .exec(callback)
        },
        persons_companys: function (callback) {
            Company.find({ 'person': req.params.id }, 'title summary')
                .exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.person == null) { // No results.
            var err = new Error('Person not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('person_detail', { title: 'Executive Detail', person: results.person, person_companys: results.persons_companys });
    });

};

// Display Person create form on GET.
exports.person_create_get = function (req, res, next) {
    res.render('person_form', { title: 'Add New Executive' });
};

// Handle Person create on POST.
exports.person_create_post = [

    // Validate fields.
    body('full_name').isLength({ min: 5 }).trim().withMessage('First name must be specified.'),
        // .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    // body('linkedin').isLength({ min: 1 }).trim().withMessage('Family name must be specified.'),
    //     // .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
    // body('bloomberg').isLength({ min: 1 }).trim().withMessage('')
    // body('portfolio_investment_date', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601(),
    // body('executive_start_date', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601(),

    // Sanitize fields.
    sanitizeBody('full_name').trim().escape(),
    sanitizeBody('linkedin').trim().escape(),
    sanitizeBody('bloomberg').trim().escape(),
    sanitizeBody('portfolio_investment_date').toDate(),
    sanitizeBody('executive_start_date').toDate(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('person_form', { title: 'Add New Executive', person: req.body, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Create an Person object with escaped and trimmed data.
            var person = new Person(
                {
                    full_name: req.body.full_name,
                    linkedin: req.body.linkedin,
                    bloomberg: req.body.bloomberg,
                    portfolio_investment_date: req.body.portfolio_investment_date,
                    executive_start_date: req.body.executive_start_date
                });
            person.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new person record.
                res.redirect(person.url);
            });
        }
    }
];



// Display Person delete form on GET.
exports.person_delete_get = function (req, res, next) {

    async.parallel({
        person: function (callback) {
            Person.findById(req.params.id).exec(callback)
        },
        persons_companys: function (callback) {
            Company.find({ 'person': req.params.id }).exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.person == null) { // No results.
            res.redirect('/catalog/persons');
        }
        // Successful, so render.
        res.render('person_delete', { title: 'Delete Executive', person: results.person, person_companys: results.persons_companys });
    });

};

// Handle Person delete on POST.
exports.person_delete_post = function (req, res, next) {

    async.parallel({
        person: function (callback) {
            Person.findById(req.body.personid).exec(callback)
        },
        persons_companys: function (callback) {
            Company.find({ 'person': req.body.personid }).exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); }
        // Success.
        if (results.persons_companys.length > 0) {
            // Person has companys. Render in same way as for GET route.
            res.render('person_delete', { title: 'Delete Executive', person: results.person, person_companys: results.persons_companys });
            return;
        }
        else {
            // Person has no companys. Delete object and redirect to the list of persons.
            Person.findByIdAndRemove(req.body.personid, function deletePerson(err) {
                if (err) { return next(err); }
                // Success - go to person list.
                res.redirect('/catalog/persons')
            })

        }
    });

};

// Display Person update form on GET.
exports.person_update_get = function (req, res, next) {

    Person.findById(req.params.id, function (err, person) {
        if (err) { return next(err); }
        if (person == null) { // No results.
            var err = new Error('Person not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('person_form', { title: 'Update Executive', person: person });

    });
};

// Handle Person update on POST.
exports.person_update_post = [

    // Validate fields.
    body('full_name').isLength({ min: 1 }).trim().withMessage('Full name must be specified.'),
        // .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('linkedin').isLength({ min: 1 }).trim().withMessage('Linkedin must be specified.'),
        // .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
    body('bloomberg').isLength({ min: 1 }).trim().withMessage('Did not validate bloomberg url'),
    body('portfolio_investment_date', 'portfolio_investment_date must be specified').optional({ checkFalsy: true }).isISO8601(),
    body('executive_start_date', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601(),

    // Sanitize fields.
    sanitizeBody('full_name').trim().escape(),
    sanitizeBody('linkedin').trim().escape(),
    sanitizeBody('bloomberg').trim().escape(),
    sanitizeBody('portfolio_investment_date').toDate(),
    sanitizeBody('executive_start_date').toDate(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create Person object with escaped and trimmed data (and the old id!)
        var person = new Person(
            {
                full_name: req.body.full_name,
                linkedin: req.body.linkedin,
                bloomberg: req.body.bloomberg,
                portfolio_investment_date: req.body.portfolio_investment_date,
                executive_start_date: req.body.executive_start_date,
                _id: req.params.id
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render('person_form', { title: 'Update Executive', person: person, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Person.findByIdAndUpdate(req.params.id, person, {}, function (err, theperson) {
                if (err) { return next(err); }
                // Successful - redirect to genre detail page.
                res.redirect(theperson.url);
            });
        }
    }
];
