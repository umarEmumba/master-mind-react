import { useState } from "react";
import './Game.css';
import FillableCircle from "../common/FillableCircle";
import GameRow from "./GameRow";
import {masterColors,  noOFColorsToChose, generateRandomArray, getDefaultConfigs} from "../../utils";
import InfoModal from "../common/InfoModal";

const Game = () => {
    const [targetColorSequence, setTargetColorSequence] =  useState(generateRandomArray(masterColors,noOFColorsToChose));
    const [gameConfig,setGameConfig] = useState(getDefaultConfigs());
    const [selectedColor,setSelectedColor] = useState(masterColors[0]);
    const [activeRowIndex, setActiveRowIndex] = useState(0);
    const [showInfoModal, setShowInfoModal] = useState(true);
    const resetGame = () => {
        setShowInfoModal(false);
        setSelectedColor(masterColors[0]);
        setActiveRowIndex(0);
        setGameConfig(getDefaultConfigs());
        setTargetColorSequence(generateRandomArray(masterColors,noOFColorsToChose));
    }
    return (
        <div className="game-content">
            <div className="left-content">
                {
                    gameConfig.map((gameRow,index) => 
                        <GameRow 
                            key={index} 
                            rowIndex={index}
                            isDisabled={activeRowIndex !== index}
                            setActiveRowIndex={setActiveRowIndex} 
                            row={gameRow} 
                            setShowInfoModal = {setShowInfoModal}
                            selectedColor={selectedColor} 
                            gameConfig={gameConfig}
                            setGameConfig = {setGameConfig}
                            expectedResult={targetColorSequence}  />
                    )
                }
            </div>
            <div className="right-content">
                {
                    masterColors.map((color,index) => <div key={index} ><FillableCircle isHighlighted={color === selectedColor}  fillerColor={color} onClick={(_)=>setSelectedColor(color)} /></div> )
                }
            </div>
            {/* uncomment to show the desired sequence 
            <div>
                {
                    targetColorSequence.map((color,index)=><div key={index} ><FillableCircle  fillerColor={color} onClick={(_)=>setSelectedColor(color)} /> </div>)
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