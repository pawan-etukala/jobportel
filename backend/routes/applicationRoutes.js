const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const Application = require('../models/Application');
const auth = require('../middleware/authMiddleware');

// // Create a new application
// router.post('/:jobId', auth, async (req, res) => {
//   const application = new Application({
//     job: req.params.jobId,
//     applicant: req.user.id,
//     resume: req.body.resume
//   });
//   await application.save();
//   res.status(201).json(application);
// });

// ✅ Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/resumes');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // e.g., 1715340800000.pdf
  }
});
const upload = multer({ storage }).single('resume');

// ✅ POST: Apply for a job with resume upload
router.post('/:jobId', auth, (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Multer Error: ' + err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'Resume file is required.' });
    }

    try {
      const application = new Application({
        job: req.params.jobId,
        applicant: req.user.id,
        resume: req.file.path,
      });
      await application.save();
      res.status(201).json({ message: 'Application submitted successfully', application });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error during application.' });
    }
  });
});


// Get applications for the logged-in user
router.get('/my', auth, async (req, res) => {
  const apps = await Application.find({ applicant: req.user.id }).populate('job');
  res.json(apps);
});

// Update the application status
router.put('/application/:id/status', auth, async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (!['Pending', 'Accepted', 'Rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const application = await Application.findById(id);
    if (!application) return res.status(404).json({ message: 'Application not found' });

    application.status = status;
    await application.save();

    res.status(200).json({ message: 'Application status updated', application });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating application status' });
  }
});

// Get all applications (Admin or authorized users)
router.get('/', auth, async (req, res) => {
  try {
    const applications = await Application.find().populate('job').populate('applicant');
    res.status(200).json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching applications' });
  }
});

// Get application by ID
router.get('/:id', auth, async (req, res) => {
  const { id } = req.params;

  try {
    const application = await Application.findById(id).populate('job').populate('applicant');
    if (!application) return res.status(404).json({ message: 'Application not found' });

    res.status(200).json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching application' });
  }
});

module.exports = router;
