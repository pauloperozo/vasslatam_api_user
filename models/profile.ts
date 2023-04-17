////////////////////////////////////////////////////////////////////////////////////////////
import { model, Schema, Document, SchemaDefinition } from "mongoose"
////////////////////////////////////////////////////////////////////////////////////////////
 
interface ProfileModel extends Document {
  ProfileId: Schema.Types.ObjectId | string,
  name: string,
}

const ProfileSchema : SchemaDefinition<ProfileModel> = {
  name: { type: String, required: true }
}

const schema: Schema<ProfileModel> = new Schema(ProfileSchema , { timestamps: true })
      schema.virtual('ProfileId').get(function () { return this._id })

const Profile  = model<ProfileModel>("Profile", schema)

////////////////////////////////////////////////////////////////////////////////////////////
export { Profile,ProfileModel }
////////////////////////////////////////////////////////////////////////////////////////////