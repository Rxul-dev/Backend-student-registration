# Backend Matriculas

Autor: **Rxul-dev**

Backend para gestión de estudiantes, cursos y matrículas usando Express, Prisma y PostgreSQL.

---

##  Tecnologías

- Node.js (Bun)
- Express
- Prisma ORM
- PostgreSQL (contenedor Docker)

---

##  Cómo usar

```bash
# Correr PostgreSQL
docker-compose up -d 

# Aplicar migraciones
bunx prisma migrate dev --name init

# Generar cliente Prisma
bunx prisma generate

# Ejecutar backend
bun run src/index.ts

--------------------------

## ->    Endpoints    <-

###  Students

- `GET /students` — Lista todos los estudiantes
- `POST /students` — Crea un nuevo estudiante

```json
{
  "first_name": "Ana",
  "second_name": "Lucía",
  "last_name": "Pérez",
  "second_last_name": "Rodríguez",
  "carnet_number": "250120"
}

# Courses 

- GET /courses — Lista todos los cursos
- POST /courses — Crea un nuevo curso

{
  "name": "Física Cuántica",
  "code": "FISQ-101"
}

# Enrollments

- POST /enrollments — Matricula un estudiante en un curso

{
  "student_id": "uuid-del-estudiante",
  "course_id": "uuid-del-curso"
}

- GET /students/:id/courses — Ver los cursos de un estudiante
- GET /courses/:id/students — Ver los estudiantes de un curso

#  students/id/courses (id student)

get students/id/courses

{
    "id": "ae2ee0d1-e1f8-411d-90bf-54819482e542",
    "name": "Matemática",
    "code": "MATH-101",
    "created_at": "2025-06-14T00:29:29.234Z"
}

# /courses/:id/students  (id course)

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