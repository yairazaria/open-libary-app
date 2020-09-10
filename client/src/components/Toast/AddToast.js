import React, { Fragment } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
export const AddToast = (toastType, toastMessage, toastPosition = 'top-right') => {
    const options = {
        autoClose: 3000,
        position: toastPosition,
        pauseOnHover: true,
        draggable: true
    };

    const successMessage = () =>{
        toast.success(`${toastMessage}`, options);
    };

    const errorMessage = () =>{
        toast.error(`${toastMessage}`, options)
    };

    return (
        <Fragment>
            {toastType ? successMessage() : errorMessage()}
        </Fragment>
    )
}
