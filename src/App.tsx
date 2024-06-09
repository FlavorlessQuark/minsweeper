import { useEffect, useRef } from 'react';
import logo from './logo.svg';

import { getRenderManager } from './renderManager';
import { render } from 'react-dom';

function App() {
    const animRef = useRef<number>(0);


    useEffect(() => {
        const renderManager = getRenderManager();
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
