
export interface IUser{
  id:number,
  name:string,
  surname:string
  card:boolean,
  balance:number,
  gender:string,
  date:Date
}

export interface IAsyncData<T>{
    error?:string,
    data?:T,
    loading?:boolean
}

export interface IPosts{
  id:number,
  title:string,
  body:string
}
