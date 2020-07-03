import React from "react";
import "./tech.scss";

const Tech = ({type, children}) => (<span className={"tech " + type}>{children}</span>);

export default Tech;