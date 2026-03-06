import express from "express"
import cors from "cors"

import pollRoutes from "./routes/poll.routes"
import { errorMiddleware } from "./middleware/error.middleware"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/polls", pollRoutes)

// GLOBAL ERROR HANDLER
app.use(errorMiddleware)

export default app