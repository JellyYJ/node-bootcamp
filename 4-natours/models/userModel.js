const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// name, email, photo, password, passwordConfirm
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email address'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid email'],
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [8, 'Password must at least have 8 characters'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // only workd on create and save, meaning not working when updating
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// before saving the data but after creating
userSchema.pre('save', async function (next) {
  // only run this function when the password has been modified
  if (!this.isModified('password')) {
    return next();
  }
  // set the password to the current password
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined; // don't want to persist this to DB
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) {
    return next();
  }
  this.passwordChangedAt = Date.now() - 1000; // since the token can be given faster
  next();
});

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

/*
 * Instance methods
 */
// Check if the user has input the same password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword); // return true when identical, false when not
};

// Check if the user has changed the password
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    // want to change the first to JWTTimestamp
    // console.log(this.passwordChangedAt.getTime(), JWTTimestamp);
    return JWTTimestamp < changedTimestamp; // return true
  }
  return false; // not changed
};

// Generate reset token
userSchema.methods.createPasswordResetToken = function () {
  // generate token
  const resetToken = crypto.randomBytes(32).toString('hex');

  // encrpt the token and save in the database (alike before-bcrypt)
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  // console.log({ resetToken }, this.passwordResetToken); // resetToken is not in DB

  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
