import { Body, Controller, Ctx, Post } from 'amala'
import { badRequest } from '@hapi/boom'
import { Context } from 'koa'
import { findOrCreateUser } from '@/models/User'
import { findOrCreateOrder } from '@/models/Order'
import TOrder from '@/validators/TOrder'
import TQuestion from '@/validators/TQuestion'
import { processOrder, processQuestion } from '@/telegram/bot'
import { findOrCreateQuestion } from '@/models/Question'

@Controller('/')
export default class PurchaseController {
  @Post('/question')
  async question(
    @Ctx() ctx: Context,
    @Body({ required: true })  question: TQuestion, 
  ) {

    console.log(23412)
    try {
    await findOrCreateQuestion({
      contact: question.contact,
      question: question.question,
      }) 
    await processQuestion(question)
    return {
      success: true
    }
  }catch (e){
    ctx.throw(badRequest(e))
}
  }

  @Post('/order')
  async order(
    @Ctx() ctx: Context,
    @Body({ required: true })  order: TOrder, 
  ) {
    try {
    const user = await findOrCreateUser({
      name: order.name,
      email: order.email,
      anotherWay: order.anotherWay,
    }) 
    const address = await findOrCreateOrder({
      user: user,
      addressLine1: order.addressLine1,
      addressLine2: order.addressLine2,
      cityOrTown: order.cityOrTown,
      stateOrProvince: order.stateOrProvince,
      country: order.country,
      code: order.postCode,
      payNow: order.payNow 
    })
    await processOrder(order)
    return {
      success: true
    }
  }catch (e){
    ctx.throw(badRequest())
}
  }

}
