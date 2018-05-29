import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new Schema({
  login: {
    type: String,
    unique: true,
    lowercase: true,
    index: true
  },
  password: String
})

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);

  this.password = hash;
  next();
})

UserSchema.methods.comparePasswords = function (password) {
  return bcrypt.compareSync(password, this.password);
}


export default mongoose.model('User', UserSchema);