import { Server, Socket } from "socket.io"

import { SessionController } from "../controllers/session.controller"
import { PollController } from "../controllers/poll.controller"
import { VoteController } from "../controllers/vote.controller"
import { ChatController } from "../controllers/chat.controller"

export function registerPollSocket(io: Server) {

    io.on("connection", async (socket: Socket) => {

        console.log("Client connected:", socket.id)

        // SEND INITIAL STATE
        try {

            const state = await PollController.getActivePollState()
            const participants = await SessionController.getActiveParticipants()

            socket.emit("poll:state", {
                poll: state?.poll,
                results: state?.results,
                remainingTime: state?.remainingTime,
                participants
            })

        } catch {
            console.error("Failed to send initial poll state")
        }

        // =========================
        // STUDENT JOIN
        // =========================

        socket.on("student:join", async ({ name, sessionId }) => {

            try {

                await SessionController.registerStudent(
                    sessionId,
                    name,
                    socket.id
                )

                const state = await PollController.getPollState(sessionId)

                const participants =
                    await SessionController.getActiveParticipants()

                io.emit("participants:update", participants)

                socket.emit("poll:state", {
                    poll: state.poll,
                    results: state.results,
                    remainingTime: state.remainingTime,
                    studentVote: state.studentVote
                })

                socket.emit("chat:history", state.messages)

            } catch {

                socket.emit("error", {
                    message: "Failed to join poll"
                })

            }

        })

        // =========================
        // TEACHER CREATE POLL
        // =========================

        socket.on("teacher:create_poll", async ({ question, options, duration }) => {

            try {

                const poll = await PollController.createPoll(
                    io,
                    question,
                    options,
                    duration
                )

                const results =
                    await PollController.getPollResults(poll.id)

                io.emit("poll:created", {
                    poll,
                    results
                })

            } catch (err: any) {

                socket.emit("error", {
                    message: err.message || "Failed to create poll"
                })

            }

        })

        // =========================
        // REQUEST STATE
        // =========================

        socket.on("teacher:request_state", async () => {

            const state = await PollController.getActivePollState()
            const participants =
                await SessionController.getActiveParticipants()

            socket.emit("poll:state", {
                poll: state.poll,
                results: state.results,
                remainingTime: state.remainingTime,
                participants
            })

        })

        // =========================
        // STUDENT SUBMIT VOTE
        // =========================

        socket.on("student:submit_vote", async ({ pollId, optionId, sessionId, name }) => {

            try {

                const { vote, results } =
                    await VoteController.submitVote(
                        pollId,
                        optionId,
                        sessionId,
                        name
                    )

                socket.emit("vote:confirmed", vote)

                io.emit("poll:update", {
                    pollId,
                    results
                })

            } catch (err: any) {

                socket.emit("error", {
                    message: err.message || "Vote failed"
                })

            }

        })

        // =========================
        // TEACHER END POLL
        // =========================

        socket.on("teacher:end_poll", async ({ pollId }) => {

            try {

                const poll = await PollController.endPoll(pollId)

                const results =
                    await PollController.getPollResults(pollId)

                io.emit("poll:ended", {
                    poll,
                    results
                })

            } catch {

                socket.emit("error", {
                    message: "Failed to end poll"
                })

            }

        })


        // =========================
        // REALTIME CHAT
        // =========================

        socket.on("chat:send", async (payload) => {

            const message = await ChatController.sendMessage(
                payload.senderName,
                payload.senderRole,
                payload.message,
                payload.pollId
            )

            io.emit("chat:new", message)

        })


        // =========================
        // REMOVE STUDENT
        // =========================

        socket.on("teacher:remove_student", async ({ sessionId }) => {

            try {

                const student =
                    await SessionController.removeStudent(sessionId)

                if (!student) {
                    socket.emit("error", {
                        message: "Student not found"
                    })
                    return
                }

                const studentSocketId = student.socketId

                if (studentSocketId) {

                    io.to(studentSocketId).emit("student:removed", {
                        message: "You were removed by the teacher"
                    })

                    const targetSocket =
                        io.sockets.sockets.get(studentSocketId)

                    targetSocket?.disconnect(true)
                }

                const participants =
                    await SessionController.getActiveParticipants()

                io.emit("participants:update", participants)

            } catch {

                socket.emit("error", {
                    message: "Failed to remove student"
                })

            }

        })

        // =========================
        // DISCONNECT
        // =========================

        socket.on("disconnect", async () => {

            console.log("Disconnected:", socket.id)

            try {

                await SessionController.markInactive(socket.id)

                const participants =
                    await SessionController.getActiveParticipants()

                io.emit("participants:update", participants)

            } catch { }

        })

    })

}