const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient'
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor'
  },
  date: {
    type: String, // String or Date depending on frontend formatting, let's use String for simplicity in the form
    required: [true, 'Date is required']
  },
  timeSlot: {
    type: String,
    required: [true, 'Time slot is required']
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'confirmed', 'cancelled'],
      message: '{VALUE} is not a valid appointment status'
    },
    default: 'pending'
  },
  reason: {
    type: String,
    maxLength: [300, 'Reason cannot exceed 300 characters']
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
