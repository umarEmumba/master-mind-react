import './InfoModal.css';
const InfoModal = ({title,buttonText, buttonAction, backGroundColor}) => {
    const modalStyle = {
        position: 'absolute',
        zIndex: 1,
        padding: '20px 60px',
        textAlign : 'center',
        boxShadow: '0 6px 8px 0 rgb(20 18 18 / 20%), 0 6px 25px 0 rgb(0 0 0 / 19%)',
        backgroundColor : backGroundColor || 'green',
    }
    return (
        <div  style={modalStyle}>
            <h2 className="modal-title">{title}</h2>
            <button onClick={buttonAction}>
                {buttonText}
            </button>
        </div>
    )
}
export default InfoModal;