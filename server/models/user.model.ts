import { model, Schema, Document, Model } from 'mongoose';

export interface IDBUser extends Document {
  username: string
  password?: string
  userID: string
}

const userSchema: Schema = new Schema ({
  username: {
    type: String,
    required: true,
    unique: true,
    tim: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true
  },
  userID: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const User: Model<IDBUser> = model('User', userSchema)

export default User
