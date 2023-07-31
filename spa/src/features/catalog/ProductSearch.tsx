import { TextField, debounce } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setProductParams } from "./catalogSlice";
import { useState } from "react";

export default function ProductSearch() {
    const {productParams}=useAppSelector(state=>state.catalog);

    const [searchTerm, setsearchTerm] = useState(productParams.searchTerm)

    const dispatch=useAppDispatch();
    const debounceSearch=debounce((event:any)=>{
        dispatch(setProductParams({searchTerm:event.target.value})) //يمثل القيمة الموجودة في الحقل 


    },1000) // to delay
  return (
    <>
      <TextField variant="outlined"
                     label='Search Product'
                     fullWidth
                     value={searchTerm||''}
                     onChange={(event:any)=>{
                        // dispatch(setProductParams({searchTerm:event.target.value})) //يمثل القيمة الموجودة في الحقل 
                        setsearchTerm(event.target.value);
                        debounceSearch(event);
                   
                    }}
                     />


    </>
  )
}
