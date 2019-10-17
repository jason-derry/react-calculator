import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';

class Calculator extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            firstNo: "",
            operator: "",
            secondNo: "",
            result: ""
        };
    }

    clearAll = (number) => {
        let firstNo;

        if(number) {
            firstNo = number.toString();
        } else {
            firstNo = "";
        }

        this.setState({
            firstNo: firstNo,
            operator: "",
            secondNo: "",
            result: ""
        });
    }

    createNumber = (number) => {
        if(this.state.result !== "") {
            this.clearAll(number);
        } else {

            if(this.state.operator === "") {
                if(!(number === "." && this.state.firstNo.includes("."))) {
                    this.setState((state) => ({
                        firstNo: state.firstNo + number
                    }));
                }
            }

            else {
                if(!(number === "." && this.state.secondNo.includes("."))) {
                    this.setState((state) => ({
                        secondNo: state.secondNo + number
                    }));
                }
            }
        }
    }

    negateNumber = () => {
        if(this.state.operator === "") {
            if(this.state.firstNo.charAt(0) === '-') {
                this.setState((state) => ({
                    firstNo: state.firstNo.slice(1)
                }));
            } else {
                this.setState((state) => ({
                    firstNo: "-" + state.firstNo
                }));
            }
        } else {
            if(this.state.secondNo.charAt(0) === '-') {
                this.setState((state) => ({
                    secondNo: state.secondNo.slice(1)
                }));
            } else {
                this.setState((state) => ({
                    secondNo: "-" + state.secondNo
                }));
            }
        }
    }

    setOperator = (sign) => {
        if(this.state.result !== ""){
            this.setState((state) => ({
                firstNo: state.result.toString(),
                operator: sign,
                secondNo: "",
                result: ""
            }));
        } 
        else if(this.state.secondNo !== "") {
            this.setState({
                firstNo: this.calcResult().toString(),
                operator: sign,
                secondNo: "",
                result: ""
            });
        } 
        else {

            if(sign === '-' && this.state.firstNo === "") {
                this.createNumber('-');
            }
            else if(sign === '-' && this.state.firstNo !== "" && this.state.operator !== "" && this.state.secondNo === "") {
                this.createNumber('-');
            }
            else {
                if(this.state.operator === "" && this.state.firstNo !== '-') {
                    this.setState({operator: sign});
                }
            }
        }

    }

    calcResult = () => {
        let firstNo, secondNo, result;

        if(this.state.firstNo.includes(".")) {
            firstNo = parseFloat(this.state.firstNo);
        } else {
            firstNo = parseInt(this.state.firstNo);
        }

        if(this.state.secondNo.includes(".")) {
            secondNo = parseFloat(this.state.secondNo);
        } else {
            secondNo = parseInt(this.state.secondNo);
        }

        if(this.state.operator === "+") {
            result = firstNo + secondNo;
        }
        else if(this.state.operator === "-") {
            result = firstNo - secondNo;
        }
        else if(this.state.operator === "×") {
            result = firstNo * secondNo;
        }
        else if(this.state.operator === "÷") {
            result = firstNo / secondNo;
        }
        else if (this.state.operator === "%") {
            result = firstNo % secondNo;            
        }
        else {
            result = firstNo;
        }

        this.setState({result: result});
        return(result);
    }

    render() {
        return (
            <div className="calc">
                <div className="calcHead">
                    {this.state.firstNo + this.state.operator + this.state.secondNo}
                    <br/>
                    {this.state.result}
                </div>

                <div className="calcBody">
                <ButtonGroup vertical>
                    <ButtonGroup>
                        <Button onClick={() => this.clearAll()}>AC</Button>
                        <Button onClick={() => this.negateNumber()}>±</Button>
                        <Button onClick={() => this.setOperator('%')}>%</Button>
                        <Button block onClick={() => this.setOperator('+')}>+</Button>
                    </ButtonGroup>

                    <ButtonGroup>
                        <Button onClick={() => this.createNumber(1)}>1</Button>
                        <Button onClick={() => this.createNumber(2)}>2</Button>
                        <Button onClick={() => this.createNumber(3)}>3</Button>
                        <Button block onClick={() => this.setOperator('-')}>-</Button>
                    </ButtonGroup>

                    <ButtonGroup>
                        <Button onClick={() => this.createNumber(4)}>4</Button>
                        <Button onClick={() => this.createNumber(5)}>5</Button>
                        <Button onClick={() => this.createNumber(6)}>6</Button>
                        <Button block onClick={() => this.setOperator('×')}>×</Button>
                    </ButtonGroup>

                    <ButtonGroup>
                        <Button onClick={() => this.createNumber(7)}>7</Button>
                        <Button onClick={() => this.createNumber(8)}>8</Button>
                        <Button onClick={() => this.createNumber(9)}>9</Button>
                        <Button block onClick={() => this.setOperator('÷')}>÷</Button>
                    </ButtonGroup>

                    <ButtonGroup>
                        <Button onClick={() => this.createNumber(0)}>0</Button>
                        <Button onClick={() => this.createNumber('.')}>.</Button>
                        <Button className="equalsBtn" block onClick={() => this.calcResult()}>=</Button>
                    </ButtonGroup>
                </ButtonGroup>
                </div>
            </div>             
        );
    }
}

export default Calculator;