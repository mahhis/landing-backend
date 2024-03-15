import {
    Ref,
    getModelForClass,
    modelOptions,
    prop,
  } from '@typegoose/typegoose'
import { User } from './User'
  
  @modelOptions({
    schemaOptions: { timestamps: true },
  })
  export class Order {

    @prop({ index: true, ref: () => User })
    user?: Ref<User>
    
    @prop({ index: true })
    addressLine1!: string
  
    @prop({ index: true })
    addressLine2?: string
  
    @prop({ index: true })
    cityOrTown!: string

    @prop({ index: true })
    stateOrProvince?: string

    @prop({ index: true })
    country!: string
  
    @prop({ index: true })
    code!: string

    @prop({ index: true, default: false })
    payNow!: boolean
  
  }
  
  export const OrderModel = getModelForClass(Order)
  
  export async function findOrCreateOrder(addressData: {
    user: User
    addressLine1: string
    addressLine2: string | undefined
    cityOrTown: string
    stateOrProvince: string | undefined
    country: string
    code: string | undefined
    payNow: boolean
  }) {
    const user = await OrderModel.findOneAndUpdate(
    addressData,
      {},
      {
        new: true,
        upsert: true,
      }
    )
    if (!user) {
      throw new Error('User not found')
    }
    return user
  }
  