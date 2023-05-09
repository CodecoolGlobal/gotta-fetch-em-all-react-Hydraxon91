import React from "react";

function MainPage(props){

    function EnterBattle(){
        console.log(`Entered battle in ${props.location} against ${props.pokemon}`);
    }
    return (
        <div key = {props.index}>
            <h1>Area</h1>
            <h2>{props.location}</h2>
            <h1>Pokemon in Area</h1>
            <h2>{props.pokemon}</h2>
            <button onClick={EnterBattle()}>Enter Area</button>
        </div>
    )
}

export default MainPage;