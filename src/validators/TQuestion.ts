import { IsString } from 'amala'

export default class TQuestion {

  @IsString()
  contact!: string

  @IsString()
  question!: string

}
