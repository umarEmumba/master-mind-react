import './GameRow.css';
import FillableCircle from "../../common/FillableCircle";
import RowResult from './RowResult';
import TickButton from '../../common/TickButton';
import { useGameRow } from './useGameRow';

const GameRow = ({ expectedResult, isDisabled, resultAction}) => {

    const {currentRow, setCircleColor, calculateResult, isAllCirclesFilled} = useGameRow(expectedResult);

    const calculateRowResult = () => {
        const correct =  calculateResult();
        resultAction(correct);
    }

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