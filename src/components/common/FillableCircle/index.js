import './FillableCircle.css';
const FillableCircle = ({fillerColor,onClick}) => {
    const backGroundStyle = {
        backgroundColor: fillerColor
    }
    
    return (
    <span onClick={onClick} className="circle" style={backGroundStyle}></span>
    )
}
export default FillableCircle;