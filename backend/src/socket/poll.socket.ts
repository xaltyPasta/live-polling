import { Server, Socket } from "socket.io"

import { SessionController } from "../controllers/session.controller"
import { PollController } from "../controllers/poll.controller"
import { VoteController } from "../controllers/vote.controller"
import { ChatController } from "../controllers/chat.controller"

export function registerPollSocket(io: Server) {

    io.on("connection", (socket: Socket) => {

        console.log("Client connected:", socket.id)

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

                const state = await PollController.getPollState(
                    sessionId
                )

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

                io.emit("poll:created", poll)

            } catch (err: any) {

                socket.emit("error", {
                    message: err.message || "Failed to create poll"
                })

            }

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
        // CHAT MESSAGE
        // =========================

        socket.on("chat:send", async (payload) => {

            try {

                const message =
                    await ChatController.sendMessage(
                        payload.senderName,
                        payload.senderRole,
                        payload.message,
                        payload.pollId
                    )

                io.emit("chat:new", message)

            } catch {

                socket.emit("error", {
                    message: "Chat failed"
                })

            }

        })

        // =========================
        // Remove Student
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

                io.emit("student:removed_from_list", {
                    sessionId
                })

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

            } catch { }

        })

    })

}