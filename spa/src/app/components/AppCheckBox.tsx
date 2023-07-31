import { Checkbox, FormControlLabel } from "@mui/material"
import { UseControllerProps, useController } from "react-hook-form"


interface Props extends UseControllerProps{
    label:string ,
    disabled:boolean
}
export default function AppCheckBox(props:Props) {
    const {field}=useController({...props,defaultValue:false})
  return (
    <FormControlLabel
    control={<Checkbox disabled={props.disabled} color="secondary" {...field} checked={field.value} />}
    label={props.label}
        />
  ) 
}
