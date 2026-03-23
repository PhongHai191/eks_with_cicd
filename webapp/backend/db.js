const { Pool } = require("pg")

const pool = new Pool({
 user:"postgres",
 host:"postgres",
 database:"webapp",
 password:"123456",
 port:5432
})

async function connectWithRetry(){

 while(true){

  try{

   await pool.query("SELECT 1")

   console.log("Connected to Postgres")

   break

  }catch(err){

   console.log("Postgres not ready, retrying in 3s")

   await new Promise(res => setTimeout(res,3000))

  }

 }

}

module.exports = {pool,connectWithRetry}