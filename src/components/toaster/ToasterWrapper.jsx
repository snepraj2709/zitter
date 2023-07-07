import { Toaster } from "react-hot-toast"

export default function ToasterWrapper(){
    return(
        <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{
          top: "1rem",
          right: "1rem",
          fontSize: "0.9rem",
        }}/>
    )
}