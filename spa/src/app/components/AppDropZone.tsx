import { UploadFile } from "@mui/icons-material";
import { FormControl, Typography, FormHelperText } from "@mui/material";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UseControllerProps, useController } from "react-hook-form"


interface Props extends UseControllerProps{
   
}
export default function AppDropZone(props:Props) {
    const {fieldState,field}=useController({...props,defaultValue:null})

    const dzStyles = {
        display: 'flex',
        border: 'dashed 3px #eee',
        borderColor: '#eee',
        borderRadius: '5px',
        paddingTop: '30px',
        alignItems: 'center',
        height: 100,
        width: 500
    }

    const dzActive = {
        borderColor: '#7b1fa2'
    }

    const onDrop = useCallback(acceptedFiles => {

        acceptedFiles[0]=Object.assign(acceptedFiles[0],{preview:URL.createObjectURL(acceptedFiles[0])});
        field.onChange(acceptedFiles[0]);



    }, [field])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    
      return (
        <div {...getRootProps()}>
         
          <FormControl error={!!fieldState.error} style={isDragActive ? {...dzStyles, ...dzActive} : dzStyles}>
                <input {...getInputProps()} />
                 <UploadFile sx={{ fontSize: '30px' }} />
                <Typography variant='h4'>Drop image here</Typography>
                <FormHelperText>{fieldState.error?.message}</FormHelperText> 
        </FormControl>
        </div>
      )
}
