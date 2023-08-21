import { useNavigate ,Link} from "react-router-dom"

export  function NotFound(){
    const navigate = useNavigate();
    return(
        <div>
            <h1>
                Ooops! Page not Found
            </h1>
            <Link onClick={navigate('/')}>Back to Home</Link>
        </div>
    )
}