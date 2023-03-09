import "./Container.css";
const Container = ({children}) => {
    return (
        <div className="container">
            <div className="content-wraper">
                {children}
            </div>
        </div>
    )
}
export default Container;