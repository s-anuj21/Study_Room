const mongoose = require('mongoose');

// Designing User Schema
const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, ''],
  },
  subject: {
    type: String,
    required: [true, ''],
  },
  leader: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, ''],
  },
  members: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  studyMaterial: [
    {
      type: String,
    },
  ],
  image: String,
  active: {
    type: Boolean,
    default: true,
  },

  startDate: {
    type: Date,
    default: Date.now(),
  },

  endDate: {
    type: String,
  },

  // This is just for short term purposes
  groupJoinToken: String,
  groupJoinTokenExpires: Date,
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
