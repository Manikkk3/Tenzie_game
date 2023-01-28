import ReactDOM from "react-dom"
import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confettti from "react-confetti"


export default function App(){
    
    
    
    
    const [arrNum, setArrNum] = React.useState(allNewDice());

    const [tenzies, setTenzies]= React.useState(false);
    

    React.useEffect(()=> {
        const allHeld = arrNum.every(num => num.isHeld)
        const firstvalue = arrNum[0].value
        const allSame = arrNum.every((num) => num.value === firstvalue)
        if (allHeld && allSame){
            setTenzies(true)
            
            
        }
    }, [arrNum])
      
    
    function allNewDice(){
        var newArr = [];
        for (let i = 0; i < 10; i++){
            newArr.push({
                value : Math.floor(Math.random() * 7),
                isHeld: false,
                id: nanoid()
            })
        }
        return newArr;   
    } 
    
        
    function rollDice(){
        if(!tenzies){
            setArrNum((arrNum) => arrNum.map(num => {
                return num.isHeld === false ?
                {...num, value: Math.floor(Math.random() * 7)} : 
                num
            }))
        }
        else{
            setTenzies(false)
            setArrNum(allNewDice)
        }
        
        {tenzies && setArrNum(allNewDice)}
    }
    
    function holdDice(id){
        setArrNum((arrNum) => arrNum.map(num => {
            return num.id === id ? 
            {...num, isHeld: !num.isHeld} :
            num
        }))
    }

    const diceElements = arrNum.map((num) => (
        <Die
            key={num.id}
            value={num.value}
            isHeld={num.isHeld} 
            holdDice={() => holdDice(num.id)}
            
        /> 
    ))
    
    return(
        <main>
            {tenzies && <Confettti />}
            <h1 className="title">Tenzies</h1>
            <p className="description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="links-container"> 
                 {diceElements}
            </div>
            <button className="rollBtn" onClick={rollDice}>{tenzies ? "New game": "Roll"}</button>
        </main>
    )
}

