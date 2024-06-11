import { useEffect, useRef } from 'react';

import styled from 'styled-components';
import { MinesweepBoard } from './core';
import { getRenderManager } from './renderManager';

function App() {
    const animRef = useRef<number>(0);
    const boardRef = useRef<MinesweepBoard | undefined>(undefined);

    useEffect(() => {
        const renderManager = getRenderManager();
        console.log("UseEFfect")
        if (boardRef.current == undefined) {

            const board:MinesweepBoard = new MinesweepBoard(5 ,5, 1);


            board.generate(2,2);
            boardRef.current = board;
        }
        // board._print();

        animRef.current = requestAnimationFrame(renderManager.getRenderLoop());
        return () => cancelAnimationFrame(animRef.current);
    }, []);

  return (
    <div className="App">
        <Container>
            <ShopContainer>
                <Text>Coins : </Text>
                <Shop/>
            </ShopContainer>
            <CanvasContainer>
                <InfoBar> <Text> Mines : </Text> <Button onClick={() => boardRef.current?.reset()}> Reset </Button></InfoBar>

                {/* <Canvas id="canvas"/> */}
                <Canvas id='canvas'/>
            </CanvasContainer>
        </Container>
    </div>
  );
}

export default App;


const Container = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    flex-direction: row;
`

const Canvas = styled.canvas`
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
`
const ShopContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 20%;
    max-height: 500px;
`

const CanvasContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    align-items: center;
    justify-content: center;
    max-height: 500px;

`

const InfoBar = styled.div`
    display: flex;
    height: 10%;
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
`

const Shop = styled.div`
    display: flex;
    flex-direction: column;
    width: 95%;
    border: 1px solid grey;
    height: 90%;
`

const Text = styled.div`
    height: 10%;
`
const Button = styled.div`
    display: flex;
    padding: 5px 10px;
    border : 1px solid black;
    background : grey;
    height: fit-content;

    &:hover {
        cursor: pointer;
    }
`
