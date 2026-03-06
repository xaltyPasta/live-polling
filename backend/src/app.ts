import express from "express"
import cors from "cors"

import pollRoutes from "./routes/poll.routes"
import { errorMiddleware } from "./middleware/error.middleware"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/health", (_req, res) => {
    return res.status(200).json({
        success: true,
        message: "Service is running successfully. Please use the following endpoint to access the API:"
    });
});


app.use("/polls", pollRoutes)

app.use((req, res) => {
    res.status(404).json({
        error: "Route not found"
    })
})

// GLOBAL ERROR HANDLER
app.use(errorMiddleware)

export default app