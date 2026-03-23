const express = require("express")
const session = require("express-session")
const RedisStore = require("connect-redis").default
const { createClient } = require("redis")
const cors = require("cors")

const { connectWithRetry } = require("./db")

const auth = require("./routes/auth")
const products = require("./routes/products")
const reviews = require("./routes/reviews")

const { client, httpRequestDuration } = require("./metrics")

const app = express()

app.use(express.json())

app.use(cors({
  origin: true,
  credentials: true
}))

const redisClient = createClient({
  url: "redis://redis:6379"
})

redisClient.connect()

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: "secret",
  resave: false,
  saveUninitialized: false
}))


app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer()

  res.on("finish", () => {
    end({
      method: req.method,
      route: req.route?.path || req.path,
      status: res.statusCode,
    })
  })

  next()
})

// ROUTES
app.use("/auth", auth)
app.use("/products", products)
app.use("/reviews", reviews)
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType)
  res.end(await client.register.metrics())
})

async function start() {
  await connectWithRetry()

  app.listen(5000, () => {
    console.log("Backend running")
  })
}

start()