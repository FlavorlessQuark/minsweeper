import { useEffect, useRef } from 'react';

import styled from 'styled-components';
import { MinesweepBoard } from './game/minesweepBoard';
import { RenderManager } from './game/render/renderManager';
import { I_MinesweeperData, resetBoard } from './game/utils';
import { GameLogic } from './game/gameLogic';
import CanvasMask from './components/CanvasMask';

let data:I_MinesweeperData;

export function getGameState(): I_MinesweeperData {
    if (!data) {
        data = {
                _grid: [],
                grid: [],
                w: 0,
                h: 0,
                mines: 0,
                coins:0,
                resetBoard:false,
                state: "unset"
            }
    }
    return data;
}


const App = () => {
    const animRef = useRef<number>(0);
    const gameLogicRef = useRef<GameLogic | undefined>(undefined);

    useEffect(() => {
        console.log("UseEFfect")
        if (gameLogicRef.current == undefined)
        {
            gameLogicRef.current = new GameLogic();
            gameLogicRef.current.minesweepBoard.newBoard(10, 10, 3);
        }
        // board._print();
        animRef.current = requestAnimationFrame(gameLogicRef.current.getGameLoop());
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
                <InfoBar> <Text> Mines : </Text> <Button onClick={() => resetBoard()}> Reset </Button></InfoBar>

                {/* <Canvas id="canvas"/> */}
                <CanvasMask/>
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
    // height: 100vh;
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
