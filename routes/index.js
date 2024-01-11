var express = require('express');
var router = express.Router();

const categoryController = require('../controllers').category;
const companyController = require('../controllers').company;
const wasteController = require('../controllers').waste;
const pairingController = require('../controllers').pairing;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// ROUTE CATEGORY
router.get('/api/category', categoryController.list);
router.get('/api/category/:id', categoryController.getById);
router.post('/api/category', categoryController.add);
router.put('/api/category/:id', categoryController.update);
router.delete('/api/category/:id', categoryController.delete);

// ROUTE COMPANY
router.get('/api/company', companyController.list);
router.get('/api/company/:id', companyController.getById);
router.post('/api/company', companyController.add);
router.put('/api/company/:id', companyController.update);
router.delete('/api/company/:id', companyController.delete);

// ROUTE WASTE
router.get('/api/waste', wasteController.list);
router.get('/api/waste/:id', wasteController.getById);
router.post('/api/waste', wasteController.add);
router.put('/api/waste/:id', wasteController.update);
router.delete('/api/waste/:id', wasteController.delete);

// ROUTE PAIRING
router.get('/api/pairing', pairingController.list);
router.get('/api/pairing/:id', pairingController.getById);
router.post('/api/pairing', pairingController.add);
// router.put('/api/pairing/:id', pairingController.update);
// router.delete('/api/pairing/:id', pairingController.delete);

module.exports = router;
