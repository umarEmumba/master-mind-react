import './GameRow.css';
import FillableCircle from "../../common/FillableCircle";
import { allowedTries, defaultColor, noOFColorsToChose, rowStatuses } from '../../../utils';
import RowResult from './RowResult';

const GameRow = ({row,rowIndex, selectedColor, gameConfig, setGameConfig, expectedResult, setActiveRowIndex, isDisabled, setShowInfoModal}) => {
    
    const setCircleColor = (circleIndex) => {
        setGameConfig((prevGameConfig)=>{
        const newGameConfig = [...prevGameConfig]
            newGameConfig[rowIndex].circles[circleIndex].color = selectedColor;
            return newGameConfig;
        });
    }
    
    const calculateRowResult = ()=> {
        let targetResult = [...expectedResult];
        const configs= [...gameConfig];
        const row = configs[rowIndex];
        const checkedIndexes = {...[...Array(noOFColorsToChose)]}; 
        // calculate correct guesses
        row?.circles?.forEach((colorInQuestion,index) => {
            if(colorInQuestion.color === expectedResult[index])
            {
                checkedIndexes[index] = true;
                targetResult.splice(( targetResult.length - expectedResult.length + index),1);
            }
        });
        const correct = expectedResult.length - targetResult.length;

        //calculate miss placed guesses
        row?.circles?.forEach((colorInQuestion,index) => {
            if(targetResult.includes(colorInQuestion.color) && !checkedIndexes[index])
                targetResult.splice([targetResult.indexOf(colorInQuestion.color)],1);
        });
        const missPlaced = expectedResult.length - correct - targetResult.length;
        const wrong = targetResult.length;
        
        // set relevent states
        setActiveRowIndex((prevIndex)=> ++prevIndex);
        setGameConfig((prevGameConfig)=> {
            const modifiedGameConfigs = [...prevGameConfig];
            modifiedGameConfigs[rowIndex].result = {
                correct,missPlaced,wrong
            }
            modifiedGameConfigs[rowIndex].status = rowStatuses.COMPLETED;
            return modifiedGameConfigs;
        });
        if(correct === noOFColorsToChose)
            setShowInfoModal("won");
        else if(rowIndex === allowedTries -1 )
            setShowInfoModal("failed");
    }
    const isAllCirclesFilled = () => !gameConfig[rowIndex].circles.find((circle)=> circle.color === defaultColor)

    const disabledStyle = {
        ...(isDisabled && {opacity :  0.6, pointerEvents : 'none', }),
        ...(!isDisabled && {border :  '1px solid gray' }),
    }

    return (
        <div className="game-row" style={disabledStyle}>
            {
                row?.circles?.map((circle,index)=> (
                <FillableCircle key={index} fillerColor={circle.color} onClick={()=>setCircleColor(index)} />
                ))
            }
            <div className='result-button-contaier result-padding'>
                {
                    !isDisabled && isAllCirclesFilled() && 
                    <span className="check-button" onClick={(_)=>calculateRowResult()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="35" height="35">
                            <path fill="#4caf50" d="M9.292 15.707L5.5 11.914l1.414-1.414 2.378 2.378L16.586 6.5l1.414 1.414z"/>
                        </svg>
                    </span>
                }
            </div>
            <div className="result-container">
                {
                    row.status === rowStatuses.COMPLETED 
                    ? 
                        <RowResult 
                        blackCircleCount={row?.result?.correct || 0} 
                        whiteCircleCount={row?.result?.missPlaced || 0} 
                        crossCircleCount={row?.result?.wrong || 0} 
                        /> 
                    :

                        <RowResult  
                            whiteCircleCount={noOFColorsToChose} 
                        />
                }
            </div>
        </div>
    )
}
export default GameRow;