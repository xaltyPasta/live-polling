import { SessionService } from "../services/session.service"

export class SessionController {

    static async registerStudent(
        sessionId: string,
        name: string,
        socketId: string
    ) {

        return SessionService.registerStudent(
            sessionId,
            name,
            socketId
        )

    }

    static async markInactive(socketId: string) {

        return SessionService.markInactive(socketId)

    }

    static async removeStudent(sessionId: string) {
        return SessionService.removeStudent(sessionId)
    }

}