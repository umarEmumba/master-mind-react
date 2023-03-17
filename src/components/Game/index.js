import { useContext, useState, useCallback } from "react";
import './Game.css';
import GameRow from "./GameRow";
import { noOFColorsToChose, generateRandomArray, allowedTries, masterColors} from "../../utils";
import InfoModal from "../common/InfoModal";
import { SelectedColorContext } from "../../contexts/SelectedColorContext";
import SelectableCircle from "../common/SelectableCircle";
const gameConfig = [...Array(allowedTries)];
const Game = () => {
    const [targetColorSequence, setTargetColorSequence] = useState(generateRandomArray(masterColors,noOFColorsToChose));
    const [activeRowIndex, setActiveRowIndex] = useState(0);
    const [showInfoModal, setShowInfoModal] = useState(true);
    const {setSelectedColor} = useContext(SelectedColorContext);

    const resetGame = useCallback(() => {
        setShowInfoModal(false);
        setSelectedColor(masterColors[0]);
        setActiveRowIndex(0);
        setTargetColorSequence(generateRandomArray(masterColors,noOFColorsToChose));
    },[setSelectedColor]);

    const rowResultAction = useCallback((rowIndex,correctGuesses) => {
        setActiveRowIndex((prevIndex)=> prevIndex+1);
        if(correctGuesses === noOFColorsToChose)
            setShowInfoModal("won");
        else if(rowIndex === allowedTries -1 )
            setShowInfoModal("failed");
    },[]);
    
    return (
        <div className="game-content">
            <div className="left-content">
                {
                    gameConfig.map((_,index) =>
                        <GameRow
                            key={`game-row-${index}`}
                            resultAction = {(correctGuesses)=>rowResultAction(index,correctGuesses)}
                            isDisabled={activeRowIndex !== index}
                            expectedResult={targetColorSequence}  />
                    )
                }
            </div>
            <div className="right-content">
                {
                    masterColors.map((color,index) => 
                    <div key={`masterColors${index}`} >
                        <SelectableCircle  fillerColor={color} />
                    </div> )
                }
            </div>
            {/* uncomment to show the desired sequence  */}
            {/* <div>
                {
                    targetColorSequence.map((color,index)=>
                    <div key={index} >
                        <SelectableCircle
                            fillerColor={color} /> 
                    </div>)
                }
            </div> */}
                {
                    showInfoModal === "won" && 
                    <InfoModal 
                        title="Congratulations!"
                        buttonText="PLAY AGAIN"
                        buttonAction={resetGame}
                        backGroundColor="#00C653"
                    />
                }
                {
                    showInfoModal === "failed" && 
                    <InfoModal 
                        title="GAME OVER!"
                        buttonText="PLAY AGAIN"
                        buttonAction={resetGame}
                        backGroundColor="#DB4445"
                    />
                }
        </div>
    );
}
export default Game;