import { toast } from "react-toastify";
import { useAppSelector } from "../store/configureStore";
import { Navigate, useLocation } from "react-router-dom";
type Props={

    children : JSX.Element,
    roles?:string[]
}
export default function ProtectedRout({children,roles}:Props) {
    const {user}=useAppSelector(state=>state.account);
    // const {basket}=useAppSelector(state=>state.basket);

    const location=useLocation();
    if(!user)return <Navigate to="../login" state={{from:location}}/>
    if(roles&&!roles.some(r=>user.roles?.includes(r))){
        toast.error('Do not authorized to Access Inventory !',{toastId:'err1'})
        return <Navigate to="../" state={{from:location}}/>

    }

    // if(!basket||basket.items.length===0)return <Navigate to="../login" />
    
    return children;

}
