export class User{
  //constructor(username: any, password: any)
  // constructor(id?: number, username?: any, password?: any) {
  //   this.id=id;
  //   this.userName=username;
  //   this.passWord=password
  // }
  constructor( username: any, password: any, hasCovid:boolean, info:boolean) {
    this.userName=username;
    this.passWord=password
    this.hasCovid=hasCovid
    this.info=info
  }

  id: number | undefined
  userName: string
  passWord: string
  hasCovid: boolean
  info: boolean

  // public getID():number{
  //   return this.id;
  //   }
}
