import http from "http"
import { Server } from "socket.io"
import app from "./app"

import { registerPollSocket } from "./socket/poll.socket"
import { PollTimerManager } from "./socket/pollTimer.manager"

const PORT = process.env.PORT || 5000

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

registerPollSocket(io)

server.listen(PORT, async () => {

  console.log(`Server running on port ${PORT}`)

  await PollTimerManager.recoverActivePoll(io)

})