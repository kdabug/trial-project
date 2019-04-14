import React from "react";
import Portal from "./Portal";

const Modal = props => (
  <>
    <Portal>{props.children}</Portal>
  </>
);

export default Modal;
