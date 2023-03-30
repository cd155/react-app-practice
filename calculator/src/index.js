import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const createDigits = () => {
    const digits = [];

    for (let i = 1; i < 10; i++) {
        digits.push(i);
    }
    digits.push(0)
    return digits;
}

const digVals = createDigits();

const funVals = ['/','x','-', '+', '%', '√', '^'];

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
        const lenDig = this.state.nums.length;
        if (this.state.nums[lenDig-1].length == 0)
            return
        else{            
            let nums = this.state.nums.slice();
            let sign = this.state.sign.slice();
            let inputSeq = this.state.inputSeq.slice();

            nums.push([]);
            sign.push(val);
            inputSeq.push("o");

            this.setState({
                nums: nums,
                sign: sign,
                result: this.state.result.concat(val.toString()),
                inputSeq: inputSeq
            });
        }
    }

    handleDigitClick(val) {
        if (this.state.inputSeq.length == 0){
            this.setState({
                nums: [[val]],
                result: val.toString()
            });
        }
        else{
            let nums = this.state.nums.slice();
            let last = nums.pop();
            last.push(val);
            nums.push(last);

            this.setState({
                nums: nums,
                result: this.state.result.concat(val.toString())
            });
        }
        this.state.inputSeq.push("d");
    }

    handleDelClick() {
        const lastSeq = this.state.inputSeq.pop();
        if (lastSeq === "o"){
            this.state.sign.pop();
            this.setState({
                result: this.state.result.slice(0, -1),
            });
        }
        else if (lastSeq === "d"){
            this.state.nums[this.state.nums.length-1].pop();
            this.setState({
                result: this.state.result.slice(0, -1),
            });
        }
        else
            this.setState({
                nums  : [[]],
                sign  : [],
                result:  "",
                inputSeq: []
            });
    }

    handleEqualClick() {
        const res = evalEqual(this.state.nums, this.state.sign);
        this.setState({
            nums  : [[res]],
            sign  : [],
            result:  res.toString(),
            inputSeq: []
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
                            onClick={() => {console.log(". clicked");}} 
                        >.</button>
                        <button 
                            onClick={() => {this.handleEqualClick(this.state.nums, this.state.sign);}} 
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

function evaluate(arr){
    const len = arr.length;
    const reverseArr = arr.reverse();
    let res = 0;
    for (let i = 0; i < len; i++){
        res = res + reverseArr[i] * Math.pow(10,i);
    }
    return res;
}

function evalEqual(digs, op){
    const lenDig = digs.length;
    const lenOp = op.length;

    let digCount = 1;
    let opCount = 0;
    let res = evaluate(digs[0]);
    if (lenDig === 0) return;

    while(digCount < lenDig && opCount < lenOp){
        if (op[opCount]==="/")
            res = res / evaluate(digs[digCount])
        else if (op[opCount]==="x")
            res = res * evaluate(digs[digCount])
        else if (op[opCount]==="-")
            res = res - evaluate(digs[digCount])
        else if (op[opCount]==="+")
            res = res + evaluate(digs[digCount])
        else if (op[opCount]==="%")
            res = res * 100
        else if (op[opCount]==="√")
            res = Math.sqrt(res)
        else if (op[opCount]==="^")
            res = res ** evaluate(digs[digCount])
        digCount++;
        opCount ++;
    }

    return res;
}