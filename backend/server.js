require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Import models
const Patient = require('./models/Patient');
const Doctor = require('./models/Doctor');
const Appointment = require('./models/Appointment');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const requestLogger = (req, res, next) => {
  const method = req.method;
  const path = req.path;
  const timestamp = new Date().toISOString();
  console.log(`[${method}] ${path} [${timestamp}]`);
  next();
};

app.use(requestLogger);


app.get('/api/v1/appointments', async (req, res, next) => {
  try {
    const apps = await Appointment.find().populate('patientId').populate('doctorId');
    const formattedApps = apps.map(a => ({
      id: a._id,
      patientName: a.patientId ? a.patientId.name : 'Unknown',
      doctorName: a.doctorId ? a.doctorId.name : 'Unknown',
      date: a.date,
      timeSlot: a.timeSlot,
      status: a.status
    }));
    res.status(200).json(formattedApps);
  } catch (err) {
    next(err);
  }
});

app.post('/api/v1/appointments', async (req, res, next) => {
  try {
    const { patientName, doctorName, date, timeSlot } = req.body;

    if (!patientName || !doctorName || !date || !timeSlot) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let doctor = await Doctor.findOne({ name: doctorName });
    if (!doctor) {
      doctor = new Doctor({ name: doctorName, specialisation: 'General', available: true });
      await doctor.save();
    }

    let patient = await Patient.findOne({ name: patientName });
    if (!patient) {
      patient = new Patient({ name: patientName, email: `${patientName.replace(/\s+/g, '').toLowerCase()}@example.com` });
      await patient.save();
    }

    const newAppointment = new Appointment({
      patientId: patient._id,
      doctorId: doctor._id,
      date,
      timeSlot,
      status: 'pending'
    });
    await newAppointment.save();

    res.status(201).json({
      id: newAppointment._id,
      patientName: patient.name,
      doctorName: doctor.name,
      date: newAppointment.date,
      timeSlot: newAppointment.timeSlot,
      status: newAppointment.status
    });
  } catch (err) {
    next(err);
  }
});

app.get('/api/v1/doctors', async (req, res, next) => {
  try {
    const docs = await Doctor.find();
    const formattedDoctors = docs.map(d => ({
      id: d._id,
      name: d.name,
      specialisation: d.specialisation,
      available: d.available
    }));
    res.status(200).json(formattedDoctors);
  } catch (err) {
    next(err);
  }
});
// Task 5: MongoDB Connection and Schema Validation endpoints
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
      console.log('Connected to MongoDB');
      const count = await Doctor.countDocuments();
      if (count === 0) {
        await Doctor.insertMany([
          { name: 'Dr. Alice Smith', specialisation: 'Cardiology', available: true },
          { name: 'Dr. Bob Jones', specialisation: 'Neurology', available: true },
          { name: 'Dr. Charlie Brown', specialisation: 'Pediatrics', available: false }
        ]);
        console.log('Seeded initial doctors in MongoDB');
      }
    })
    .catch(err => console.error('MongoDB connection error:', err));
}

// Endpoint to demonstrate Mongoose schema working (Task 5)
app.post('/api/mongoose/appointments', async (req, res, next) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    next(error);
  }
});

// Endpoint to demonstrate validation failure explicitly (Task 5)
app.post('/api/mongoose/patients', async (req, res, next) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    next(error);
  }
});
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({
      error: 'Validation Error',
      messages
    });
  }

  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'Something went wrong on the server'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
