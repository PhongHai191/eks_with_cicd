const express = require("express")
const bcrypt = require("bcrypt")
const {pool} = require("../db")

const router = express.Router()

// SIGNUP
router.post("/signup", async(req,res)=>{

 try{

  const {username,password} = req.body

  const hash = await bcrypt.hash(password,10)

  await pool.query(
   "INSERT INTO users(username,password_hash) VALUES($1,$2)",
   [username,hash]
  )

  res.json({msg:"signup success"})

 }catch(err){

  console.error(err)
  res.status(500).json({msg:"server error"})

 }

})


// LOGIN
router.post("/login", async (req,res)=>{

 try{

  const {username,password} = req.body

  const user = await pool.query(
   "SELECT * FROM users WHERE username=$1",
   [username]
  )

  if(user.rows.length === 0){
   return res.status(400).json({
    message:"Invalid username or password"
   })
  }

  const valid = await bcrypt.compare(
   password,
   user.rows[0].password_hash
  )

  if(!valid){
   return res.status(400).json({
    message:"Invalid username or password"
   })
  }

  req.session.userId = user.rows[0].id

  res.json({
   message:"login success"
  })

 }catch(err){

  console.error(err)
  res.status(500).json({msg:"server error"})

 }

})


// CHECK LOGIN
router.get("/me",(req,res)=>{

 if(!req.session.userId){
  return res.json({loggedIn:false})
 }

 res.json({
  loggedIn:true,
  userId:req.session.userId
 })

})


// LOGOUT
router.post("/logout",(req,res)=>{

 req.session.destroy(()=>{

  res.json({msg:"logged out"})

 })

})

module.exports = router