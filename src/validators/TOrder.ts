import { IsString } from 'amala'

export default class TOrder {

  name?: string 
  
  @IsString()
  email!: string

  anotherWay?: string

  @IsString()
  country!: string

  @IsString()
  cityOrTown!: string

  stateOrProvince?: string

  @IsString()
  addressLine1!: string
  
  addressLine2?: string

  postCode?: string

  payNow!: boolean

}
