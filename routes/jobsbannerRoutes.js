const express = require('express');
const {Router} = express;
const router = Router();
const {jobsbannerController, jobBannerImageparser} = require('../controllers/jobsbannerController');
const authMiddleware = require('../middleware/auth');


//Routes
router.post('/', authMiddleware, jobBannerImageparser.single('job-image'), jobsbannerController.postBanner);
router.get('/', authMiddleware, jobsbannerController.getBanner);
router.delete('/:id', authMiddleware, jobsbannerController.deleteBanner)

module.exports = router;