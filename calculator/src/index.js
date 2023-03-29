import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const createDigits = () => {
    const digits = [];

    for (let i = 1; i < 10; i++) {
        digits.push(i);
    }

    return digits;
}

const digits = createDigits();

class App extends React.Component {
    render() {
        return(
            <div className="App">
                <div className="calculator">
                    <div className="display">
                        <span>0</span> {0}
                    </div>

                    <div className="operators">
                        <button>/</button>
                        <button>x</button>
                        <button>-</button>
                        <button>+</button>

                        <button>DEL</button>
                    </div>

                    <div className="digits">
                        {
                            digits.map((val,i) => 
                                <button key = {i} >{val}</button>
                            )
                        }
                        <button >0</button>
                        <button >.</button>
                        <button >=</button>
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