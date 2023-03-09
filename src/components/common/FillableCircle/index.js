import './FillableCircle.css';
const FillableCircle = ({fillerColor,isHighlighted = false,onClick=()=>{}}) => {
    return (<span onClick={onClick} className="circle" style={{backgroundColor: fillerColor, border: isHighlighted ? '1px solid' : 'none'}}></span>)
}
export default FillableCircle;