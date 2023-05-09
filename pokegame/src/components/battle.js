import React from "react";

function BattleMenu(props){

    function GoBack(){
        props.setBattleState(false)
    }
    return (
        <div>
            <button onClick={() => GoBack()}>Go Back</button>
            <h1>This is the battle menu</h1>
        </div>
    
    )
}

export default BattleMenu;