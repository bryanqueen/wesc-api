const express = require('express');
const {Router}  = express;
const router = Router();
const adminController = require('../controllers/adminController');

//Routes
router.post('/signup', adminController.signUp );
router.post('/signin', adminController.signIn);
router.get('/:id', adminController.viewProfile );
router.put('/:id', adminController.editProfile);
router.delete('/:id', adminController.deleteProfile);

module.exports = router;