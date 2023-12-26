var express = require('express');
var router = express.Router();
const sredstvoControllers = require('../controllers/sredstvoControllers')

router.get('/sredstvo', sredstvoControllers.sredstvo_get_get);
router.post('/sredstvo', sredstvoControllers.sredstvo_get_post);

router.delete('/sredstvo', sredstvoControllers.sredstvo_delete);



module.exports = router;