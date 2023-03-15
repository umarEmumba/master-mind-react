import './GameRow.css';
import FillableCircle from "../../common/FillableCircle";
import { allowedTries, defaultColor, gameRow, noOFColorsToChose, rowStatuses } from '../../../utils';
import RowResult from './RowResult';
import { useEffect, useState } from 'react';

const GameRow = ({rowIndex, selectedColor, expectedResult, setActiveRowIndex, isDisabled, setShowInfoModal}) => {
    const [currentRow,setcurrentRow] = useState(gameRow());
    useEffect(function resetRow(){
        setcurrentRow(gameRow());
    },[expectedResult]);

    const setCircleColor = (circleIndex) => {
        setcurrentRow((prevRow)=>{
            const modifiedRow = {...prevRow}
                modifiedRow.circles[circleIndex].color = selectedColor;
                return modifiedRow;
        });
    }
    
    const calculateRowResult = ()=> {
        let targetResult = [...expectedResult];
        const checkedIndexes = [...Array(noOFColorsToChose)]; 
        // calculate correct guesses
        currentRow?.circles?.forEach((colorInQuestion,index) => {
            if(colorInQuestion.color === expectedResult[index])
            {
                checkedIndexes[index] = true;
                targetResult.splice(( targetResult.length - expectedResult.length + index),1);
            }
        });
        const correct = expectedResult.length - targetResult.length;
        //calculate miss placed guesses
        currentRow?.circles?.forEach((colorInQuestion,index) => {
            if(targetResult.includes(colorInQuestion.color) && !checkedIndexes[index])
                targetResult.splice([targetResult.indexOf(colorInQuestion.color)],1);
        });
        const missPlaced = expectedResult.length - correct - targetResult.length;
        const wrong = targetResult.length;
        // set relevent states
        setActiveRowIndex((prevIndex)=> ++prevIndex);
        setcurrentRow((prevRow)=>{
            const modifiedRow = {...prevRow}
            modifiedRow.result = {
                correct,missPlaced,wrong
            }
            modifiedRow.status = rowStatuses.COMPLETED;
            return modifiedRow;
        });
        if(correct === noOFColorsToChose)
            setShowInfoModal("won");
        else if(rowIndex === allowedTries -1 )
            setShowInfoModal("failed");
    }

    const isAllCirclesFilled = () => !currentRow.circles.some((circle)=> circle.color === defaultColor)

    const disabledStyle = {
        ...(isDisabled ? {opacity :  0.6, pointerEvents : "none", } : {border :  "1px solid gray" }),
    }

    return (
        <div className="game-row" style={disabledStyle}>
            {
                currentRow?.circles?.map((circle,index)=> (
                <FillableCircle key={index} fillerColor={circle.color} onClick={()=>setCircleColor(index)} />
                ))
            }
            <div className="result-button-contaier result-padding">
                {
                    !isDisabled && isAllCirclesFilled() && 
                    <span className="check-button" onClick={(_)=>calculateRowResult()}>
                        <img src="assets/images/svgs/tick-icon.svg" alt="tick-icon" />
                    </span>
                }
            </div>
            <div className="result-container">
                <RowResult 
                    result={currentRow?.result}
                />
            </div>
        </div>
    )
}
export default GameRow;