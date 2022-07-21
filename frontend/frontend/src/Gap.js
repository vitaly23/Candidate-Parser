import React from "react";



export default function Gap ( {gap} ) {

    if(gap === 0){
        return <p>No gap</p>
    }
    else if(gap > 365){
        return <p>Gap: {Math.round(gap/365)} Years</p>
    }
    else if(gap > 31){
        return <p>Gap: {Math.round(gap/31)} Months</p>
    }
    else if(gap < 31){
        return <p>Gap: {gap} Days</p>
    }
    else {
        return <p>No gap</p>
    }
}