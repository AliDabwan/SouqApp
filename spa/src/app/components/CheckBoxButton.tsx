import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import { useState } from 'react'


type Props={

    items:string[]
    checked?:string[],
    onChange:(items:string[])=>void
}
export default function CheckBoxButton({items,onChange,checked}:Props) {

    const [checkedItems, setcheckedItems] = useState(checked||[])

    const handleChecked=(value:string)=>{
        const currentIndex=checkedItems.findIndex(item=>item===value);
        let newChecked:string []=[];
        if(currentIndex===-1)newChecked=[...checkedItems,value]
        else newChecked=checkedItems.filter(item=>item!==value);
        setcheckedItems(newChecked);

        onChange(newChecked);
    }
  return (
    <FormGroup>
                   
    {
       
        items.map(item=>(
            <FormControlLabel key={item}
             label={item}
             control={<Checkbox
             checked={checkedItems.indexOf(item)!==-1}
             onClick={()=>handleChecked(item)}
             
             />} />

        ))

    }


</FormGroup>
  )
}
