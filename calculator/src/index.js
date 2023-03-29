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

const funVals = ['/','x','-', '+'];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nums  : [[]],
            sign  : [],
            result:  "",
            inputSeq: []
        }
    }

    handleFunClick(val) {
        this.state.sign.push(val);
        this.state.nums.push([]);
        this.state.inputSeq.push("o")
        this.setState({
            result: this.state.result.concat(val.toString())
        });
    }

    handleDigitClick(val) {
        this.state.nums[this.state.nums.length-1].push(val);
        this.state.inputSeq.push("d")
        this.setState({
            result: this.state.result.concat(val.toString())
        });
    }

    handleDelClick() {
        const lastSeq = this.state.inputSeq.pop();
        if (lastSeq === "o")
            this.state.sign.pop();
        else if (lastSeq === "d")
            this.state.nums[this.state.nums.length-1].pop();
        
        this.setState({
            result: this.state.result.slice(0, -1),
        });
    }

    render() {
        return(
            <div className="App">
                <div className="calculator">
                    <div className="display">
                        <span>{this.state.result}</span> {"|"}
                    </div>

                    <div className="operators">
                        {
                            funVals.map((val,i) => 
                                <button key = {i} 
                                        onClick={() => {this.handleFunClick(val);}}
                                >{val}</button>
                            )
                        }
                        <button 
                        onClick={() => {this.handleDelClick();}} 
                        >DEL</button>
                    </div>

                    <div className="digits">
                        {
                            digVals.map((val,i) => 
                                <button key = {i} 
                                        onClick={() => {this.handleDigitClick(val);}}
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
