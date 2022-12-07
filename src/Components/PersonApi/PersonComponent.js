// import { NULL } from "node-sass";
import React from "react";
const Person = ({resource}) => {
    const data = resource.data.read()
    console.log(data.data());
    return (
        <div>{null}</div>
    )
}
export default Person