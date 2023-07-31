import * as yup from 'yup';
import "yup-phone";

 
export const validationSchema=[

    yup.object({

        fullName:yup.string().required('Full name is required'),
        address1:yup.string().required('Address 1 is required'),
        address2:yup.string().required(),
        city:yup.string().required(),
        country:yup.string().required(),
        postalCode:yup.string().required(),
        phone:yup.string().phone('00967').required(),
    
    
    
    }),
    yup.object(),
    yup.object({

        nameOnCard:yup.string().required('Name is required'),
        // cardNumber:yup.string().required('cardNumber is required'),

    }),


] 