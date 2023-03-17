import { useContext, useState } from "react";
import { SelectedColorContext } from "../../../../contexts/SelectedColorContext";
import { gameRow, noOFColorsToChose, rowStatuses } from "../../../../utils";

export const useGameRow = () => {
    
    const {selectedColor} = useContext(SelectedColorContext);
    const [currentRow,setcurrentRow] = useState(gameRow());
    
    const setCircleColor = (circleIndex) => {
        setcurrentRow((prevRow)=>{
            const modifiedRow = Object.assign({}, prevRow);
                modifiedRow.circles[circleIndex].color = selectedColor;
                return modifiedRow;
        });
    }
    
    const calculateResult = (expectedResult)=> {
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
    // some instead of every because of less time complexity
    return {currentRow, setcurrentRow, setCircleColor,calculateResult}
}