import './GameRow.css';
import FillableCircle from "../../common/FillableCircle";
import { defaultColor, gameRow, noOFColorsToChose, rowStatuses } from '../../../utils';
import RowResult from './RowResult';
import { useContext, useEffect, useState } from 'react';
import TickButton from '../../common/TickButton';
import { SelectedColorContext } from '../../../contexts/SelectedColorContext';
const GameRow = ({ expectedResult, isDisabled, resultAction}) => {
    
    const [currentRow,setcurrentRow] = useState(gameRow());
    const {selectedColor} = useContext(SelectedColorContext);
    
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
    
    const calculateRowResult = ()=> {
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
        resultAction(correct);
    }
    // some instead of every because of less time complexity
    const isAllCirclesFilled = () => !currentRow.circles.some((circle)=> circle.color === defaultColor)

    return (
        <div className={`game-row ${isDisabled ? 'disabled' : 'row-border'}`}>
            {
                currentRow.circles?.map((circle,index)=> (
                <FillableCircle key={`fillable-${index}`} fillerColor={circle.color} onClick={()=>setCircleColor(index)} />
                ))
            }
            <div className="result-button-contaier result-padding">
            {
                !isDisabled && isAllCirclesFilled() && 
                <TickButton onClick={calculateRowResult} />
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