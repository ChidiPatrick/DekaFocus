import React,{useState} from "react";
import StopWatch from "./StopWatch";
const createArray =   length =>[...Array(length)]
const StopWatchNumber = ({totalNumber = 6}) => {
    const [selectedClocks,setSelectedClocks] = useState(0)
    return (<>
        {createArray(totalNumber)
        .map((n,i) => <StopWatch key={i} selected={selectedClocks > i}
        onSelect={() => setSelectedClocks(i + 1)}
        
        />)}
    </>)
}
export default StopWatchNumber