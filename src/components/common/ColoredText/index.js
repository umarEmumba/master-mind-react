const ColoredText = ({bgColor, children, color}) => {
    const style = {
        colorProperties : {
            backgroundColor: bgColor,
            color : (color || "white"),
            padding: "5px",
        }
    }
    return (
        <span style={style.colorProperties}>
            {children}
        </span>
    );
}
export default ColoredText;