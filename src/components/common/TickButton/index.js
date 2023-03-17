const TickButton = ({onClick}) => {
    return (
        <span className="check-button" onClick={onClick}>
            <img src="assets/images/svgs/tick-icon.svg" alt="tick-icon" />
        </span>
    )
}
export default TickButton;