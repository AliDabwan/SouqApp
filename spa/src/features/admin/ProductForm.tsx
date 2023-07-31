import { Box, Paper, Typography, Grid, Button } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";
import { Product } from "../../app/models/product";
import { useEffect } from "react";
import AppSelectList from "../../app/components/AppSelectList";
import useProducts from "../../app/hooks/useProducts";
import AppDropZone from "../../app/components/AppDropZone";
import { yupResolver } from "@hookform/resolvers/yup";
import { productValidationSchema } from "./productValidation";
import agent from "../../app/api/agent";
import { useAppDispatch } from "../../app/store/configureStore";
import { setProduct } from "../catalog/catalogSlice";
import { LoadingButton } from "@mui/lab";


type Props={
    product?:Product,
    cancelEdit:()=>void
}

export default function ProductForm({product,cancelEdit}:Props) {
    const { control ,reset,handleSubmit,watch,formState:{isDirty,isSubmitting}} = useForm({
        resolver:yupResolver<any>(productValidationSchema)
    });
    const {brands,types}=useProducts();

    const watchFile=watch('file',null);
    const disptach=useAppDispatch();

    useEffect(()=>{
        if(product && !watchFile && !isDirty)reset(product)
        return()=>{
            if(watchFile)URL.revokeObjectURL(watchFile.preview);
        }
    },[product,reset,watchFile,isDirty])

    const handleSubmitData=async (data:FieldValues)=>{
        try {
            let response:Product;
            if(product){
                response=await agent.Admin.updateProduct(data);
                disptach(setProduct(response));
                cancelEdit();
            }else{
                response=await agent.Admin.createProduct(data);

                disptach(setProduct(response));
                cancelEdit();
            }

        } catch (error) {
            console.log(error);

        }
    }
    return (
        <Box component={Paper} sx={{ px: 4, py: 2, mt: 10, mx: 2 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                Product Details
            </Typography>
            <form onSubmit={handleSubmit(handleSubmitData)}>

           
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <AppTextInput control={control} name='name' label='Product name' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppSelectList control={control} items={brands}  name='brand' label='Brand' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppSelectList control={control} items={types}  name='type' label='Type' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} type="number" name='price' label='Price' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} type="number" name='quantityInStock' label='Quantity in Stock' />
                </Grid>
                <Grid item xs={12}>
                    <AppTextInput control={control} multiline rows={3} name='description' label='Description' />
                </Grid>
                <Grid item xs={12}>
                    <Box display='flex'>
                    <AppDropZone control={control} name='file' />
                    {
                        watchFile?(
                            <img src={watchFile.preview} alt='preview' style={{marginLeft:80,maxHeight:150}}/>
                        ):(
                            <img src={product?.pictureUrl} alt={product?.name} style={{marginLeft:80,maxHeight:150}}/>
                        )
                    }

                    </Box>
                </Grid>
            </Grid>
            <Box display='flex' justifyContent='space-between' sx={{ mt: 3 }}>
                <Button onClick={cancelEdit} variant='contained' color='inherit'>Cancel</Button>
                <LoadingButton loading={isSubmitting} type="submit" variant='contained' color='primary'>Submit</LoadingButton>
            </Box>
            </form>
        </Box>
    )
}