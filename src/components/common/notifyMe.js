import { toast } from 'react-toastify';

export const NotifyMe = function (status, msg) {
    const styleObj = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false
    };
    
    if (status === 'success') {
        return toast.success(msg, styleObj);
    } else if (status === 'info') {
        return toast.info(msg, styleObj);
    } else if (status === 'warning') {
        return toast.warning(msg, styleObj);
    } else if (status === 'error') {
        return toast.error(msg, styleObj);
    } else {
        return toast(msg, styleObj);
    }
}