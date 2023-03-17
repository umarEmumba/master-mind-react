import { useContext } from 'react';
import { SelectedColorContext } from '../../../contexts/SelectedColorContext';
import './SelectableCircle.css';
const SelectableCircle = ({fillerColor}) => {
    const {selectedColor, setSelectedColor} = useContext(SelectedColorContext);
    const additionalStyle = {
        backgroundColor: fillerColor,
        ...(selectedColor === fillerColor && {border: '1px solid'})
    }
    return (<span onClick={()=>setSelectedColor(fillerColor)} className="circle" style={additionalStyle}></span>)
}
export default SelectableCircle;