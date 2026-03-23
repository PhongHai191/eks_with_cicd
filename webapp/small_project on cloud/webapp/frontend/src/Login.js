import {useState} from "react"
import axios from "axios"

function Login(){

 const [username,setUsername] = useState("")
 const [password,setPassword] = useState("")
 const [error,setError] = useState("")

 const login = async()=>{

  try{

   await axios.post(
    "/auth/login",
    {username,password},
    {withCredentials:true}
   )

   window.location.href="/"

  }catch(err){

   setError("Sai tài khoản hoặc mật khẩu")

  }

 }

 return(

  <div>

   <h2>Login</h2>

   {error && (
    <p style={{color:"red"}}>
     {error}
    </p>
   )}

   <input
    placeholder="username"
    onChange={(e)=>setUsername(e.target.value)}
   />

   <br/>

   <input
    type="password"
    placeholder="password"
    onChange={(e)=>setPassword(e.target.value)}
   />

   <br/>

   <button onClick={login}>
    Login
   </button>

  </div>

 )

}

export default Login