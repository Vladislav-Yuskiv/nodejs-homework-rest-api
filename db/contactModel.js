const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
  },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'users'
  },
    favorite: {
      type: Boolean,
      default: false,
    },
  });

const Contact = mongoose.model('contacts', contactSchema);

module.exports = {
  Contact
};
