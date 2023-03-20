import { useContext, useEffect, useState } from "react";
import { SelectedColorContext } from "../../../../contexts/SelectedColorContext";
import { defaultColor, gameRow, noOFColorsToChose, rowStatuses } from "../../../../utils";

export const useGameRow = (expectedResult) => {

    const {selectedColor} = useContext(SelectedColorContext);
    const [currentRow,setcurrentRow] = useState(gameRow());
    
    useEffect(function resetRow(){
        setcurrentRow(gameRow());
    },[expectedResult]);

    const setCircleColor = (circleIndex) => {
        setcurrentRow((prevRow)=>{
            const modifiedRow = Object.assign({}, prevRow);
                modifiedRow.circles[circleIndex].color = selectedColor;
                return modifiedRow;
        });
    }
    
    const calculateResult = () => {
        let targetResult = Object.assign([],expectedResult);
        const checkedIndexes = [...Array(noOFColorsToChose)]; 
        // calculate correct guesses
        currentRow.circles?.forEach((colorInQuestion,index) => {
            if(colorInQuestion.color === expectedResult[index])
            {
                checkedIndexes[index] = true;
                targetResult.splice(( targetResult.length - expectedResult.length + index),1);
            }
        });
        const correct = expectedResult.length - targetResult.length;
        //calculate miss placed guesses
        currentRow.circles?.forEach((colorInQuestion,index) => {
            if(targetResult.includes(colorInQuestion.color) && !checkedIndexes[index])
                targetResult.splice([targetResult.indexOf(colorInQuestion.color)],1);
        });
        const missPlaced = expectedResult.length - correct - targetResult.length;
        const wrong = targetResult.length;
        // set relevent states
        setcurrentRow((prevRow)=>{
            const modifiedRow = Object.assign({},prevRow);
            modifiedRow.result = {
                correct,missPlaced,wrong
            }
            modifiedRow.status = rowStatuses.COMPLETED;
            return modifiedRow;
        });
        return correct;
    }

    const isAllCirclesFilled = () => currentRow.circles.every((circle)=> circle.color !== defaultColor)
    return {currentRow, setcurrentRow, setCircleColor, calculateResult, isAllCirclesFilled}
}