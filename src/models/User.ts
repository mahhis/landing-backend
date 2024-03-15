import {
  getModelForClass,
  modelOptions,
  prop,
} from '@typegoose/typegoose'

@modelOptions({
  schemaOptions: { timestamps: true },
})
export class User {
  
  @prop({ index: true })
  name?: string

  @prop({ index: true, lowercase: true })
  email!: string

  @prop({ index: true })
  anotherWay?: string
  
}

export const UserModel = getModelForClass(User)

export async function findOrCreateUser(userData: {
  name: string | undefined
  email: string
  anotherWay: string | undefined
}) {
  let user = await UserModel.findOne({ email: userData.email });

  if (user) {
    if (userData.name !== undefined) {
      user.name = userData.name;
    }
    if (userData.anotherWay !== undefined) {
      user.anotherWay = userData.anotherWay;
    }
    await user.save();
  } else {
    user = await UserModel.create(userData);
  }

  return user;
}
