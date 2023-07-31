import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'


type Props={
    options:any[]
    onChange:(event:any)=>void
    selectedValue:string

}

export default function RadioButtonGroup({onChange,options,selectedValue}:Props) {
  return (
    <FormControl component="fieldset" >
    <RadioGroup onChange={onChange} value={selectedValue}
     >
            {
                options.map(({value,label})=>(
                    <FormControlLabel key={value} value={value} label={label} control={<Radio/>} />

                ))

            }
       
    </RadioGroup>
</FormControl>
  )
}
