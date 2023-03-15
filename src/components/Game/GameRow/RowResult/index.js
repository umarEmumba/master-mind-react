import { noOFColorsToChose } from "../../../../utils"
import BlackCircleIcon from "../../../common/BlackCircleIcon"
import CrossInCircleIcon from "../../../common/CrossInCircleIcon"
import WhiteCircleIcon from "../../../common/WhiteCircleIcon"
import './RowResult.css'

const RowResult = ({result}) => {
    return (
        result ? 
        <span className='result-padding' >
            {
                [...Array(result?.correct || 0)].map((_,index)=> <BlackCircleIcon key = {index} />)
                
            }
            {
                [...Array(result?.missPlaced || 0)].map((_, index)=> <WhiteCircleIcon key={index} /> )
            }
            {
                [...Array(result?.wrong || 0)].map((_, index)=> <CrossInCircleIcon key={index} />)

            }
        </span>
        :
        <span className='result-padding' >
            {
                [...Array(noOFColorsToChose)].map((_, index)=> <WhiteCircleIcon key={`pending-result-${index}`} />)
            }
        </span>

    )
}
export default RowResult;