import { useEffect, useRef } from 'react';
import logo from './logo.svg';

import { render_loop } from './renderer';
import { render } from 'react-dom';

function App() {
    const animRef = useRef<number>(0);


    useEffect(() => {
        animRef.current = requestAnimationFrame(render_loop);
        return () => cancelAnimationFrame(animRef.current);
    }, []);

  return (
    <div className="App">
        <canvas id="canvas"/>
    </div>
  );
}

export default App;
