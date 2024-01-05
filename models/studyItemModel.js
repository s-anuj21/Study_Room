const mongoose = require('mongoose');

const studyItemSchema = new mongoose.Schema({
  fileName: [
    {
      type: String,
      required: [true, 'fileName is required.'],
    },
  ],

  description: {
    type: String,
  },

  group: {
    type: mongoose.Schema.ObjectId,
    ref: 'Group',
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },

  sentOn: {
    type: Date,
    default: Date.now(),
  },
});

const StudyItem = mongoose.model('StudyItem', studyItemSchema);
module.exports = StudyItem;
