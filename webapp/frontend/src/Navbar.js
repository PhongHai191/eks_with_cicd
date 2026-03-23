import {Link} from "react-router-dom"
import {useEffect,useState} from "react"
import axios from "axios"

function Navbar(){

 const [loggedIn,setLoggedIn] = useState(false)

 useEffect(()=>{

  axios.get("/auth/me",{withCredentials:true})
  .then(res=>{
   setLoggedIn(res.data.loggedIn)
  })

 },[])


 const logout = async()=>{

  await axios.post("/auth/logout",{},{
   withCredentials:true
  })

  window.location.href="/"

 }

 return(

  <div style={{
   display:"flex",
   justifyContent:"space-between",
   padding:"10px",
   background:"#eee"
  }}>

   <div>

    <Link to="/">Cars</Link>

   </div>

   <div>

    {loggedIn ? (

     <button onClick={logout}>
      Logout
     </button>

    ):(

     <>
      <Link to="/login">Login</Link>
      {" "}
      <Link to="/signup">Signup</Link>
     </>

    )}

   </div>

  </div>

 )

}

export default Navbar