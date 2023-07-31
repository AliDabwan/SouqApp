export interface CounterState{

    data:number,
    title:string
}

const initialState:CounterState={
    data:40,
    title:'Counter Reducer By Redux'
}


// THAWABIT
export const INCREMENT_COUNTER="INCREMENT_COUNTER";
export const DECREMENT_COUNTER="DECREMENT_COUNTER";

export const increment=(amouont=1)=>{
    return {
        type:INCREMENT_COUNTER,
        payload:amouont
    }

}
export const decrement=(amouont=1)=>{
    return {
        type:DECREMENT_COUNTER,
        payload:amouont
    }

}





export default function counterReducer(state=initialState,action:any){

switch (action.type) {
    case INCREMENT_COUNTER:
        
       return {
        ...state,
        data:state.data+action.payload
       }
       case DECREMENT_COUNTER:
        
       return {
        ...state,
        data:state.data-action.payload
       }

    default:
        return state;
}



}