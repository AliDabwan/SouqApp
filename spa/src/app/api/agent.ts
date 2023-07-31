import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { PaginatedResponse } from "../models/PaginationData";
import { SouqStore } from "../store/configureStore";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

// axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.baseURL = process.env.REACT_APP_API_URL;


axios.defaults.withCredentials=true;

axios.interceptors.request.use(config=>{
    const token=SouqStore.getState().account.user?.token;
    if(token)config.headers!.Authorization=`Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {

    if(process.env.NODE_ENV==='development')await sleep();

    const pagination=response.headers['pagination'];
    if(pagination){
        response.data=new PaginatedResponse(response.data,JSON.parse(pagination));
        return response;
    }
    return response
}, (error: AxiosError) => {
    const { data, status } = error.response!;

    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors: string[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat()
            }
            toast.error(data.title)
            break;
        case 401:
            toast.error(data.title)
           
            break;
            case 403:
                toast.error('You are not authorized to do this !')
               
                break;
        case 500:
            history.push('server-error', { error: data })
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
})
const responseBody = (response: AxiosResponse) => response.data;
const requests = {
    get: (url: string,params?:URLSearchParams) => axios.get(url,{params:params}).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
    postForm:(url:string,data:FormData)=>
        axios.post(url,data,{
            headers:{'Content-type':'multipart/from-data'}
        }).then(responseBody)
    ,
    putForm:(url:string,data:FormData)=>
        axios.put(url,data,{
            headers:{'Content-type':'multipart/from-data'}
        }).then(responseBody)
    
}
const createFormData=(product:any)=>{
    let formData=new FormData();
    for (const key in product) {
      
        formData.append(key,product[key])
    }
    return formData;

}
 //to return void use {} after arrow func 
 //to return promise delete {} after arrow func
const Admin={
    createProduct:(product:any)=>requests.postForm('products',createFormData(product)),
    updateProduct:(product:any)=>requests.putForm('products',createFormData(product)),

    deleteProduct:(id:number)=>requests.delete(`products/${id}`)



}
const Catalog = {
    list: (params:URLSearchParams) => requests.get('products',params),
    details: (id: string) => requests.get(`products/${id}`),
    fetchFilters:()=>requests.get('products/filters')
}
 
const Errors = {
    get400Error: () => requests.get('error/bad-request'),
    get401Error: () => requests.get('error/unauthorized'),
    get404Error: () => requests.get('error/not-found'),
    getValidationError: () => requests.get('error/validation-error'),
    get500Error: () => requests.get('error/server-error')
}
const Basket={
    get:()=>requests.get('basket'),
    addItem:(productId:number,quantity=1)=>requests.post(`basket?productId=${productId}&quantity=${quantity}`,{}),
    deleteItem:(productId:number,quantity=1)=>requests.delete(`basket?productId=${productId}&quantity=${quantity}`)
}
const Account={
    login:(values:any)=>requests.post('account/login',values),
    register:(values:any)=>requests.post('account/register',values),
    currentUser:()=>requests.get('account/currentUser'),
    fetchAddress:()=>requests.get('account/savedAddress')


}

const Orders={
    list: () => requests.get('orders'),
    fetch: (id: string) => requests.get(`orders/${id}`),
    create:(values:any)=>requests.post('orders',values)


}
const Payment={
    createPaymentIntent:()=>requests.post('payment',{})

}

const agent = {
    Catalog,
    Errors,
    Basket,
    Account,
    Orders,
    Payment,
    Admin
}

export default agent;