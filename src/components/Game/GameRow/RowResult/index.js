import BlackCircleIcon from "../../../common/BlackCircleIcon"
import CrossInCircleIcon from "../../../common/CrossInCircleIcon"
import WhiteCircleIcon from "../../../common/WhiteCircleIcon"
import './RowResult.css'

const RowResult = ({blackCircleCount = 0, whiteCircleCount = 0, crossCircleCount = 0}) => {
    return (
        <span className='result-padding' >
            {
                [...Array(blackCircleCount)].map((_,index)=> <BlackCircleIcon key = {index} />)
                
            }
            {
                [...Array(whiteCircleCount)].map((_, index)=> <WhiteCircleIcon key={index} /> )
            }
            {
                [...Array(crossCircleCount)].map((_, index)=> <CrossInCircleIcon key={index} />)

            }
        </span>
    )
}
export default RowResult;