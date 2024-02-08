const express = require('express');
const {Router} = express;
const router = Router();
const programmeController = require('../controllers/programmeController');
const authMiddleware = require('../middleware/auth');

//Routes
router.post('/', authMiddleware, programmeController.createProgramme);
router.get('/', authMiddleware, programmeController.viewAllProgrammes);
router.put('/:id', authMiddleware, programmeController.editProgramme);
router.delete('/:id', authMiddleware, programmeController.deleteProgramme)

module.exports = router;