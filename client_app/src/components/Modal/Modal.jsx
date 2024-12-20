import React from 'react'
import ReactDom from 'react-dom'

import classes from './Modal.module.css'
import {useSelector, useDispatch} from 'react-redux'

const Modal = ({children})=> {

    return ReactDom.createPortal(
        <div className={classes.modal}>
            <div className={classes.modal__overlay}>
                {children}
            </div>
        </div>,
        document.getElementById("portal")
    )

}

export default Modal