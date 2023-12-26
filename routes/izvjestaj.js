var express = require('express');
var router = express.Router();
const izvjestajControllers = require('../controllers/izvjestajControllers')

router.get('/izvjestaj', izvjestajControllers.izvjestaj_get);
router.post('/izvjestaj', izvjestajControllers.izvjestaj_post);


module.exports = router;