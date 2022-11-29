import {
    redirect,
    useNavigate
} from "react-router-dom"
import "./btn.css"

const Redirects = () => {
    const navigate = useNavigate()
    //navigate("/about")

    return (
        <div className="btn">
            <button type="button" onClick={() => navigate("usuario")}>
                Usuario
            </button>
        </div>
    )
}

export default Redirects