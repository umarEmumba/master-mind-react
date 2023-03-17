import './GameRow.css';
import FillableCircle from "../../common/FillableCircle";
import { defaultColor, gameRow } from '../../../utils';
import RowResult from './RowResult';
import { useEffect } from 'react';
import TickButton from '../../common/TickButton';
import { useGameRow } from './useGameRow';
const GameRow = ({ expectedResult, isDisabled, resultAction}) => {

    const {currentRow, setcurrentRow, setCircleColor,calculateResult} = useGameRow();

    useEffect(function resetRow(){
        setcurrentRow(gameRow());
    },[expectedResult,setcurrentRow]);

    const calculateRowResult = () => {
        const correct =  calculateResult(expectedResult);
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