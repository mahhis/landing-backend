import {
  getModelForClass,
  modelOptions,
  prop,
} from '@typegoose/typegoose'

@modelOptions({
  schemaOptions: { timestamps: true },
})
export class Question {
  
  @prop({ index: true })
  contact!: string

  @prop({ index: true })
  question!: string

}

export const QuestionModel = getModelForClass(Question)

export async function findOrCreateQuestion(questionData: {
  contact: string 
  question: string
}) {

 const question = await QuestionModel.create(questionData);
 return question
}
