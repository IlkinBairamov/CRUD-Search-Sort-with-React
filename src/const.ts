import { IAsyncData } from "./models";

export const APP_ROUTES ={
    USERS:{
        PATH:'/Users',
        POSTS:{
            PATH: '/users/:id/posts'
        }
    },
    DASHBOARD: {
        PATH:'/'
    }
}

export const Initial_Async_Data: IAsyncData<any>={
    error:undefined,
    data:null,
    loading:undefined
}