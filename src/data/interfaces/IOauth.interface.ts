
export interface IOauth {
    signup: (data: object)=> Promise<any>,
    checkifexist: (id: string) => Promise<any>,
}