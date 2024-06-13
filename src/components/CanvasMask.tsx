import { useEffect } from "react";
import styled from "styled-components";
import { getGameState } from "../App";


const CanvasMask = () =>
{
    useEffect(() => {

        console.log("Re-render state changed")
    },[getGameState().state])
    return (
        <div>
            aaa
        </div>
    )
}


export default CanvasMask;
