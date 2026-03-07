# 🗳️ Live Polling System

A **real-time teacher–student polling platform** built as a full-stack monorepo. Teachers create timed polls, students vote instantly, and results update live for all participants. The system is engineered for **resilience** — polls survive page refreshes, late joins, and server restarts without any data loss.

🔗 **Live Demo:** [Frontend](https://live-polling-pi.vercel.app) &nbsp;|&nbsp; [Backend](https://live-polling-backend-5bfy.onrender.com)

---

## 📸 Screenshots

> _Add screenshots here — Teacher Dashboard, Student Voting Page, Live Results, Chat_

---

## ✨ Features

### 👩‍🏫 Teacher

- Create polls with a question, multiple options, and a countdown timer
- Mark a correct answer per poll
- View live vote results updating in real time
- End polls manually before the timer expires
- Monitor all connected participants
- Remove disruptive students (disconnects their socket immediately)
- Browse full poll history with final results

### 🎓 Student

- Join a session with a display name
- Vote on the active poll (one vote per session, enforced at DB level)
- See live result updates as others vote
- Participate in the real-time session chat

### ⚙️ System

- **Live updates** via Socket.IO WebSockets
- **Timer sync** — remaining time is derived client-side from `startTime + duration`, so late joiners always see the correct countdown
- **Refresh recovery** — full poll state, results, remaining time, prior vote, and chat history are restored on reconnect
- **Server restart recovery** — `PollTimerManager` re-queries the DB on startup and reschedules any active poll timer
- **Duplicate vote prevention** — `@@unique([pollId, sessionId])` constraint at the database level
- **Real-time chat** with persistent history

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Bootstrap, Vite |
| Backend | Node.js, Express, TypeScript |
| Real-Time | Socket.IO |
| Database | PostgreSQL (Supabase) |
| ORM | Prisma |
| Frontend Deploy | Vercel |
| Backend Deploy | Render |

---

## 📁 Monorepo Structure

```
live-polling/
│
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── chat/
│       │   ├── poll/
│       │   ├── participants/
│       │   └── layout/
│       ├── pages/
│       │   ├── TeacherLiveResultsPage.tsx
│       │   ├── StudentVotePage.tsx
│       │   └── PollHistoryPage.tsx
│       ├── hooks/
│       │   └── socket.ts
│       ├── services/
│       │   └── poll.service.ts
│       └── types/
│
├── backend/
│   └── src/
│       ├── controllers/
│       │   ├── poll.controller.ts
│       │   ├── vote.controller.ts
│       │   ├── session.controller.ts
│       │   └── chat.controller.ts
│       ├── services/
│       │   ├── poll.service.ts
│       │   ├── vote.service.ts
│       │   ├── session.service.ts
│       │   └── chat.service.ts
│       ├── socket/
│       │   ├── poll.socket.ts
│       │   └── pollTimer.manager.ts
│       ├── routes/
│       │   └── poll.routes.ts
│       ├── prisma/
│       │   └── prisma.ts
│       ├── middleware/
│       │   └── error.middleware.ts
│       ├── utils/
│       │   ├── timer.util.ts
│       │   └── AppError.ts
│       ├── app.ts
│       └── server.ts
│
├── prisma/
│   └── schema.prisma
│
└── README.md
```

---

## 🏗️ System Architecture

```
Teacher / Student Client  (React + Vite — Vercel)
              │
              │  WebSocket (Socket.IO) + REST (HTTP)
              ▼
   Express + Socket.IO Server  (Node.js — Render)
              │
     ┌────────┴────────┐
     │                 │
Controllers         REST Routes
     │                 │
     └────────┬────────┘
              │
        Services Layer
     (business logic lives here)
              │
          Prisma ORM
              │
     PostgreSQL — Supabase
```

The backend enforces a strict **Socket → Controller → Service → Prisma → Database** flow. No business logic leaks into the socket layer, and no raw queries exist outside of services.

---

## 🖥️ Frontend

### Pages

**`TeacherLiveResultsPage.tsx`**
The teacher's main dashboard. Displays the active poll question, a live bar chart of vote counts per option, the connected participant list, and the chat panel. Polls can be ended manually from here.

**`StudentVotePage.tsx`**
The student's view after joining. Shows the active poll question with clickable vote options. Once voted, options become disabled and a live result breakdown appears. The countdown timer is shown, derived from `startTime + duration`.

**`PollHistoryPage.tsx`**
Displays all completed polls with their final vote distributions. Fetched from `GET /polls/history`.

---

### Components

| Component | Description |
|---|---|
| `chat/` | Chat popup with a message list and input field. Connects via `chat:send` and `chat:new` socket events. Loads history from `chat:history` on join. |
| `poll/` | Poll creation form (teacher), vote option buttons (student), live results chart |
| `participants/` | Connected student list, with remove button for teachers |
| `layout/` | Shared header, page wrappers, role-based routing guards |

---

### Hooks & Services

**`hooks/socket.ts`**
Initialises the Socket.IO client connection and exposes the socket instance across the app. Handles connection, disconnection, and reconnection events.

**`services/poll.service.ts`**
Wraps all REST API calls — fetches the active poll state (`GET /polls/active`) for recovery on page load, and fetches poll history (`GET /polls/history`).

---

### State Recovery (Frontend)

On every page load or refresh, the frontend calls `GET /polls/active`, which returns:

```json
{
  "poll": { "id": "...", "question": "...", "startTime": "...", "duration": 60 },
  "results": { "optionId": voteCount },
  "remainingTime": 34,
  "studentVote": "optionId or null"
}
```

The UI rebuilds entirely from this response — no local state is persisted in the browser.

---

### Timer Synchronization (Frontend)

The client never trusts a pushed timer value. Instead it calculates:

```ts
const remainingTime = poll.duration - Math.floor((Date.now() - new Date(poll.startTime).getTime()) / 1000);
```

This means late joiners, refreshers, and newly connected students all display the same correct countdown without any extra server round-trip.

---

## ⚙️ Backend

### Controller Layer

Controllers receive socket events or HTTP requests, coordinate the relevant services, and emit the appropriate responses. They contain no business logic.

| Controller | Responsibility |
|---|---|
| `poll.controller.ts` | Create poll, end poll, get poll state, handle timer expiry |
| `vote.controller.ts` | Submit vote, return updated results |
| `session.controller.ts` | Register student join, handle disconnect, remove student |
| `chat.controller.ts` | Store and broadcast chat messages, return history |

---

### Service Layer

All business logic and Prisma queries live here.

| Service | Responsibility |
|---|---|
| `poll.service.ts` | Create/end/query polls, enforce single active poll rule |
| `vote.service.ts` | Persist votes, aggregate results by option |
| `session.service.ts` | Manage `StudentSession` records, track active connections |
| `chat.service.ts` | Persist messages, query chat history |

---

### Socket Layer — `poll.socket.ts`

Registers all Socket.IO event listeners and maps them to controllers.

```
student:join          → SessionController.registerStudent()
                        PollController.getPollState()
                        ChatController.getHistory()

student:submit_vote   → VoteController.submitVote()
                        → io.emit("poll:update", results)

teacher:create_poll   → PollController.createPoll()
                        → io.emit("poll:created", poll)

teacher:end_poll      → PollController.endPoll()
                        → io.emit("poll:ended")

teacher:remove_student→ SessionController.removeStudent()
                        → socket.disconnect()

chat:send             → ChatController.saveMessage()
                        → io.emit("chat:new", message)

disconnect            → SessionController.markInactive()
```

---

### PollTimerManager — `pollTimer.manager.ts`

Handles all poll lifecycle timing server-side.

**On server startup:**

```ts
PollTimerManager.recoverActivePoll()
```

1. Queries DB for any poll with `status: ACTIVE`
2. Calculates `remainingTime = duration - (now - startTime)`
3. If `remainingTime > 0`, schedules `setTimeout` to end the poll
4. If `remainingTime <= 0`, ends the poll immediately

**On poll creation:**

```ts
PollTimerManager.startTimer(pollId, duration)
```

Schedules the end timer and stores the timeout reference so it can be cancelled if the teacher ends the poll manually.

---

### REST Routes — `poll.routes.ts`

| Method | Route | Handler | Description |
|---|---|---|---|
| `GET` | `/polls/active` | `PollController.getActivePoll` | Returns active poll + results + remainingTime + studentVote |
| `GET` | `/polls/history` | `PollController.getPollHistory` | Returns all completed polls with vote breakdowns |

---

### Error Handling

All service errors are thrown using `AppError`:

```ts
throw new AppError("Poll already active", 400);
throw new AppError("Poll not found", 404);
throw new AppError("Already voted", 409);
```

The global middleware in `error.middleware.ts` catches these and returns a consistent JSON response:

```json
{
  "status": "error",
  "statusCode": 400,
  "message": "Poll already active"
}
```

Socket errors are emitted back to the client as:

```ts
socket.emit("error", { message: "..." });
```

---

## 🔌 Socket Events Reference

### Client → Server

| Event | Payload | Description |
|---|---|---|
| `student:join` | `{ name, sessionId }` | Register student, receive full poll state |
| `student:submit_vote` | `{ optionId, sessionId, pollId }` | Submit a vote |
| `teacher:create_poll` | `{ question, options, duration, correctIndex }` | Create a new poll |
| `teacher:end_poll` | `{ pollId }` | Manually end the active poll |
| `teacher:remove_student` | `{ sessionId }` | Remove a student and disconnect their socket |
| `chat:send` | `{ senderName, senderRole, message, pollId? }` | Send a chat message |

### Server → Client

| Event | Payload | Description |
|---|---|---|
| `poll:state` | `{ poll, results, remainingTime, studentVote, chatHistory }` | Full state snapshot on join/refresh |
| `poll:created` | `{ poll }` | Broadcast new poll to all clients |
| `poll:update` | `{ results }` | Live vote count update after each vote |
| `poll:ended` | `{ pollId }` | Poll has ended (timer or manual) |
| `vote:confirmed` | `{ optionId }` | Confirms vote recorded for the voting student |
| `chat:new` | `{ senderName, senderRole, message, createdAt }` | New chat message |
| `chat:history` | `[ ...messages ]` | Historical messages on join |
| `student:removed` | — | Emitted to removed student before disconnect |
| `error` | `{ message }` | Error response to the triggering socket |

---

## 🗄️ Database Schema

```prisma
model Poll {
  id        String     @id @default(uuid())
  question  String
  duration  Int
  startTime DateTime
  endedAt   DateTime?
  status    PollStatus
  options   Option[]
  votes     Vote[]
  messages  Message[]
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt

  @@schema("livepoll")
}

model Option {
  id        String   @id @default(uuid())
  text      String
  pollId    String
  poll      Poll     @relation(fields: [pollId], references: [id], onDelete: Cascade)
  isCorrect Boolean  @default(false)
  votes     Vote[]
  createdAt DateTime @default(now())

  @@schema("livepoll")
}

model Vote {
  id        String   @id @default(uuid())
  pollId    String
  optionId  String
  sessionId String
  name      String
  poll      Poll     @relation(fields: [pollId], references: [id], onDelete: Cascade)
  option    Option   @relation(fields: [optionId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())

  @@unique([pollId, sessionId])  // prevents duplicate votes
  @@schema("livepoll")
}

model StudentSession {
  id        String   @id @default(uuid())
  sessionId String   @unique
  name      String
  socketId  String?
  active    Boolean  @default(true)
  joinedAt  DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@schema("livepoll")
}

model Message {
  id         String   @id @default(uuid())
  senderName String
  senderRole Role
  message    String
  pollId     String?
  poll       Poll?    @relation(fields: [pollId], references: [id], onDelete: Cascade)
  createdAt  DateTime @default(now())

  @@schema("livepoll")
}

enum PollStatus {
  ACTIVE
  COMPLETED

  @@schema("livepoll")
}

enum Role {
  TEACHER
  STUDENT

  @@schema("livepoll")
}
```

---

## 🔁 Real-Time Event Flows

### Poll Creation

```
Teacher submits poll form
       │
       ▼
socket.emit("teacher:create_poll", { question, options, duration, correctIndex })
       │
       ▼
PollController → PollService.createPoll()
       │         (sets status: ACTIVE, records startTime)
       ▼
PollTimerManager.startTimer(pollId, duration)
       │
       ▼
io.emit("poll:created", poll)
       │
       ▼
All connected clients receive and render the poll
```

---

### Voting

```
Student selects an option
       │
       ▼
socket.emit("student:submit_vote", { optionId, sessionId, pollId })
       │
       ▼
VoteController → VoteService.castVote()
       │         (DB enforces @@unique([pollId, sessionId]))
       ▼
VoteService.getResults(pollId)
       │
       ▼
socket.emit("vote:confirmed", { optionId })   ← to voting student only
io.emit("poll:update", { results })           ← to all clients
```

---

### Poll End (Timer)

```
PollTimerManager setTimeout fires
       │
       ▼
PollController.endPoll(pollId)
       │
       ▼
PollService.markCompleted(pollId)
       │         (sets status: COMPLETED, records endedAt)
       ▼
io.emit("poll:ended", { pollId })
       │
       ▼
All clients hide the poll UI
```

---

### Page Refresh / Reconnect

```
Client loads / refreshes
       │
       ▼
GET /polls/active  (REST)
       │
       ▼
PollController.getActivePoll()
       │
       ▼
Returns { poll, results, remainingTime, studentVote }
       │
       ▼
Frontend rebuilds poll UI and restarts countdown

socket.emit("student:join", { name, sessionId })
       │
       ▼
Server emits "chat:history" to the reconnecting socket
```

---

## 🚀 Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/xaltyPasta/live-polling.git
cd live-polling
```

### 2. Install dependencies

```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### 3. Configure environment variables

**`backend/.env`**

```env
DATABASE_URL=your_supabase_postgresql_url
PORT=5000
CORS_ORIGIN=http://localhost:5173
```

**`frontend/.env`**

```env
VITE_BACKEND_URL=http://localhost:5000
```

### 4. Run database migrations

```bash
cd backend
npx prisma migrate dev
npx prisma generate
```

### 5. Start development servers

```bash
# Backend
cd backend && npm run dev

# Frontend (new terminal)
cd frontend && npm run dev
```

Frontend runs at `http://localhost:5173` — Backend runs at `http://localhost:5000`

---

## ☁️ Deployment

| Layer | Platform | Environment Variables Required |
|---|---|---|
| Frontend | [Vercel](https://vercel.com) | `VITE_BACKEND_URL` |
| Backend | [Render](https://render.com) | `DATABASE_URL`, `PORT`, `CORS_ORIGIN` |
| Database | [Supabase](https://supabase.com) | — (provides `DATABASE_URL`) |

---

## 🔮 Future Improvements

- Socket rooms scoped per poll session for multi-classroom support
- Teacher authentication with protected routes
- Poll scheduling with a configurable start time
- Role-based access control
- Analytics dashboard with per-student vote breakdowns
- Export poll results as CSV
