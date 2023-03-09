import { useState } from "react";
import RulesDetails from "./RulesDetails";
import './GameRules.css'

const GameRules = () => {
    const [showRules,setShowRules] = useState(false);
    return (
        <div className="rules">
            {!showRules && 
                <p className="rules rule-btn" onClick={()=>setShowRules(!showRules)}>Show Rules</p> 
            }
            {showRules && (
                <>
                    <p className="rule-btn" onClick={()=>setShowRules(!showRules)}>Hide Rules</p>   <RulesDetails />
                </> 
                )
            }
        </div>
    )
}
export default GameRules;