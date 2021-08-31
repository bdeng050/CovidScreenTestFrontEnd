export class User{
  //constructor(username: any, password: any)
  // constructor(id?: number, username?: any, password?: any) {
  //   this.id=id;
  //   this.userName=username;
  //   this.passWord=password
  // }
  constructor( username: any, password: any, hasCovid:boolean) {
    this.userName=username;
    this.passWord=password
    this.hasCovid=hasCovid
  }

  id: number | undefined
  userName: string
  passWord: string
  hasCovid: boolean

  // public getID():number{
  //   return this.id;
  //   }
}
