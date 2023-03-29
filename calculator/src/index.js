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
    return digits;
}

const digVals = createDigits();

const funVals = ['/','x','-', '+', 'DEL'];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nums  : [[]],
            sign  : [],
            result:  0
        }
    }

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
                                        onClick={() => {
                                            this.state.sign.push(val);
                                            this.state.nums.push([])
                                            console.log(this.state.sign, this.state.nums);
                                        }}
                                >{val}</button>
                            )
                        }
                    </div>

                    <div className="digits">
                        {
                            digVals.map((val,i) => 
                                <button key = {i} 
                                        onClick={() => {
                                            this.state.nums[this.state.nums.length - 1].push(val)
                                            console.log(this.state.nums);
                                        }}
                                >{val}</button>
                            )
                        }
                        <button 
                            onClick={() => {console.log(`= clicked!`);}} 
                        >=</button>
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
