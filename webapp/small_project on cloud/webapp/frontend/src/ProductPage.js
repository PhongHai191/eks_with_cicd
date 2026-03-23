import axios from "axios"
import {useEffect,useState} from "react"
import {useParams,useNavigate} from "react-router-dom"

function ProductPage(){

 const {id} = useParams()

 const navigate = useNavigate()

 const [product,setProduct] = useState(null)
 const [reviews,setReviews] = useState([])

 const [newReview,setNewReview] = useState("")

 useEffect(()=>{

  axios.get("/products/"+id)
  .then(res=>setProduct(res.data))

  axios.get("/reviews/"+id)
  .then(res=>setReviews(res.data))

 },[id])


 const submitReview = async ()=>{

  try{

   await axios.post("/reviews",{

    product_id:id,
    review:newReview

   },{withCredentials:true})

   window.location.reload()

  }catch(err){

   if(err.response.status === 401){

    alert("Please login first")

    navigate("/login")

   }

  }

 }

 if(!product) return <div>Loading...</div>

 return(

  <div>

   <h2>{product.name}</h2>

   <img src={product.image_url} width="300"/>

   <p>{product.description}</p>

   <p>Price: ${product.price}</p>


   <h3>Reviews</h3>

   {reviews.map((r,i)=>(
     <p key={i}>{r.review}</p>
   ))}


   <h3>Add Review</h3>

   <input
    value={newReview}
    onChange={(e)=>setNewReview(e.target.value)}
   />

   <button onClick={submitReview}>
    Submit
   </button>

  </div>

 )

}

export default ProductPage