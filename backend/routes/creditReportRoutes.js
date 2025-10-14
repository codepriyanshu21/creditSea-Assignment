import express from 'express';
import multer from 'multer';
import { uploadCreditReport, getCreditReports } from '../controllers/creditReportController.js';

const router = express.Router();

// Multer setup for file upload
const upload = multer({ dest: 'uploads/' });

// Routes
router.post('/upload', upload.single('xmlFile'), uploadCreditReport);
router.get('/reports', getCreditReports);

export default router;
