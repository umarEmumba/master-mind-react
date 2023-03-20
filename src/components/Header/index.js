import { masterColors } from "../../utils";
import './Header.css';
import ColoredText from "../common/ColoredText";
const Header = () => {
    return (
        <header>
            <h1 className="heading">
                {
                    [...'MASTER'].map((singleCharacter,index)=>
                    <ColoredText key={index} bgColor={masterColors[index] || masterColors[index % masterColors.length] }>{singleCharacter}</ColoredText>
                    )
                }
                {` MIND`}
            </h1>
        </header>
    );
}
export default Header;