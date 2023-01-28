
export default function Die(props){
    
    
    return(
        <div className="link-container" onClick={props.holdDice}> 
        <a className={props.isHeld ? "held-dice" : ""}>{props.value}</a>
        </div>
    )
}