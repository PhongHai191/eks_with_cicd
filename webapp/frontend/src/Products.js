import axios from "axios"
import {useEffect,useState} from "react"
import {Link} from "react-router-dom"

function Products(){

 const [products,setProducts] = useState([])

 useEffect(()=>{

  axios.get("/products")
  .then(res=>setProducts(res.data))

 },[])

 return(

  <div>

   <h2>Cars</h2>

   {products.map(p=>(

    <div key={p.id}>

     <Link to={"/product/"+p.id}>

      <h3>{p.name}</h3>

      <img src={p.image_url} width="250"/>

     </Link>

    </div>

   ))}

  </div>

 )

}

export default Products