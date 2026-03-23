const express = require("express")
const {pool} = require("../db")

const router = express.Router()


router.get("/:productId", async(req,res)=>{

 const result = await pool.query(

  "SELECT review FROM reviews WHERE product_id=$1",

  [req.params.productId]

 )

 res.json(result.rows)

})


router.post("/", async(req,res)=>{

 if(!req.session.userId){

  return res.status(401).json({
   msg:"login required"
  })

 }

 const {product_id,review} = req.body

 await pool.query(

  "INSERT INTO reviews(product_id,user_id,review) VALUES($1,$2,$3)",

  [product_id,req.session.userId,review]

 )

 res.json({msg:"review added"})

})

module.exports = router