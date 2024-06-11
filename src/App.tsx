import { useEffect, useRef } from 'react';
import logo from './logo.svg';

import { getRenderManager } from './renderManager';
import { render } from 'react-dom';
import { MinesweepBoard } from './core';



function App() {
    const animRef = useRef<number>(0);


    useEffect(() => {
        const renderManager = getRenderManager();
        console.log("UseEFfect")
        const board:MinesweepBoard = new MinesweepBoard(5 ,5, 1);


        board.generate(2,2);
        board._print();

        animRef.current = requestAnimationFrame(renderManager.getRenderLoop());
        return () => cancelAnimationFrame(animRef.current);
    }, []);

  return (
    <div className="App">
        <canvas id="canvas"/>
    </div>
  );
}

export default App;
