import {useState} from "react"
import axios from "axios"

function Signup(){

 const [username,setUsername] = useState("")
 const [password,setPassword] = useState("")

 const signup = async ()=>{

  await axios.post("/auth/signup",{

   username,
   password

  })

  window.location.href="/login"

 }

 return(

  <div>

   <h2>Signup</h2>

   <input
    placeholder="username"
    onChange={(e)=>setUsername(e.target.value)}
   />

   <input
    placeholder="password"
    type="password"
    onChange={(e)=>setPassword(e.target.value)}
   />

   <button onClick={signup}>Signup</button>

  </div>

 )

}

export default Signup