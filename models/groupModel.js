const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

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

  // This is just for short term purposes, for joining groups
  groupJoinToken: String,
  groupJoinTokenExpires: Date,
});

groupSchema.methods.createJoinToken = async function () {
  // Generating 16 character string
  const token = crypto.randomBytes(8).toString('hex');
  this.groupJoinToken = await bcrypt.hash(token, 8);
  this.groupJoinTokenExpires = Date.now() + 6 * 60 * 60 * 1000;
  return token;
};

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
