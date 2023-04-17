////////////////////////////////////////////////////////////////////////////////////////////
import { model, Schema, Document, SchemaDefinition } from "mongoose"
////////////////////////////////////////////////////////////////////////////////////////////
 
interface UserModel extends Document {
  UserId: Schema.Types.ObjectId | string,
  name:string,
  email:string,
  phone:string,
  login: string,
  password: string,
  ProfileId: Schema.Types.ObjectId | string,
  OwnerId: Schema.Types.ObjectId | string | null
}

const UserSchema : SchemaDefinition < UserModel >  = {
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  ProfileId: { type: Schema.Types.ObjectId, ref: 'profile',required: true },
  OwnerId: { type: Schema.Types.ObjectId, ref: 'user' }
}

const schema: Schema<UserModel> = new Schema( UserSchema , { timestamps: true } )
      schema.virtual('UserId').get(function () { return this._id })

const User  = model<UserModel>("User", schema)

////////////////////////////////////////////////////////////////////////////////////////////
export { User,UserModel }
////////////////////////////////////////////////////////////////////////////////////////////