const express = require('express');
const {Router}  = express;
const router = Router();
const userController = require('../controllers/userController');

//Routes
router.post('/signup', userController.signUp );
router.post('/signIn', userController.signIn);
router.get('/:id', userController.viewProfile );
router.put('/:id', userController.editProfile);
router.delete('/:id', userController.deleteProfile);

module.exports = router;