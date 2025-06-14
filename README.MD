# Backend Enrollments

Autor: **Rxul-dev**

A backend application for managing students, courses, and enrollments using Express, Prisma, and Dockerized PostgreSQL.

---

##  Technologies

- Node.js (Bun)
- Express
- Prisma ORM
- PostgreSQL (Docker container)

---

##  How to Use

```bash
# Run PostgreSQL
docker compose up

# Apply migrations
bunx prisma migrate dev --name init

# Generate Prisma client
bunx prisma generate

# Generate test user and test courses 
bun run prisma/seed.ts

# Run backend
bun run src/index.ts

--------------------------

## ->    Endpoints    <-

###  Students

- `GET /students` — List all students
- `POST /students` — Create a new student

```json
{
  "first_name": "Ana",
  "second_name": "Lucía",
  "last_name": "Pérez",
  "second_last_name": "Rodríguez",
  "carnet_number": "250120"
}

# Courses 

- GET /courses — List all courses
- POST /courses — Create a new course

{
  "name": "Quantum Physics",
  "code": "FISQ-101"
}

# Enrollments

- POST /enrollments — Enroll a student in a course

{
  "student_id": "student-uuid",
  "course_id": "course-uuid"
}

- GET /students/:id/courses — View the courses of a student
- GET /courses/:id/students — View the students in a course

#  students/id/courses (student id)

get students/id/courses

{
    "id": "ae2ee0d1-e1f8-411d-90bf-54819482e542",
    "name": "Matemática",
    "code": "MATH-101",
    "created_at": "2025-06-14T00:29:29.234Z"
}

# /courses/:id/students  (course id)

get /courses/:id/students

{
    "id": "079a620f-cfa9-4cce-975a-ba1473741cfb",
    "first_name": "Ana",
    "second_name": "Lucía",
    "last_name": "Pérez",
    "second_last_name": "Rodríguez",
    "carnet_number": "2025-003",
    "created_at": "2025-06-13T23:58:49.972Z"
}
