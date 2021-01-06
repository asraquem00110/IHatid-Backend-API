export interface IAuth {
    login: (data: any)=> Promise<any>,
    logout: ()=> void,
}