import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const createDigits = () => {
    const digits = [];

    for (let i = 1; i < 10; i++) {
        digits.push(i);
    }
    digits.push(0)
    digits.push(".")
    digits.push("=")
    return digits;
}

const digVals = createDigits();

const funVals = ['/','x','-', '+', 'DEL'];

class App extends React.Component {
    render() {
        return(
            <div className="App">
                <div className="calculator">
                    <div className="display">
                        <span>0</span> {0}
                    </div>

                    <div className="operators">
                        {
                            funVals.map((val,i) => 
                                <button key = {i} 
                                        onClick={() => {console.log(`${val} clicked!`);}}
                                >{val}</button>
                            )
                        }
                    </div>

                    <div className="digits">
                        {
                            digVals.map((val,i) => 
                                <button key = {i} 
                                        onClick={() => {console.log(`${val} clicked!`);}}
                                >{val}</button>
                            )
                        }
                    </div>
                </div>
		    </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render (        
    <App />
);