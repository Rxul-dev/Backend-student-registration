// src/index.ts
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { Course, User, StudentCourse } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// GET all users
app.get('/students', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// POST for new user
app.post('/students', async (req, res) => {
  const { first_name, second_name, last_name, second_last_name, carnet_number } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        first_name,
        second_name,
        last_name,
        second_last_name,
        carnet_number
      }
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: 'Error creating user', details: err });
  }
});

// PUT /students/:id - Edit a student
app.put('/students/:id', async (req, res) => {
  const { id } = req.params;
  const { first_name, second_name, last_name, second_last_name, carnet_number } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        first_name,
        second_name,
        last_name,
        second_last_name,
        carnet_number
      }
    });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: 'Error updating student', details: err });
  }
});

// DELETE /students/:id - delete a student
app.delete('/students/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await prisma.user.delete({
      where: { id }
    });
    res.json({ message: 'Estudiante eliminado correctamente', deletedUser });
  } catch (err) {
    res.status(400).json({ error: 'Error deleting student', details: err });
  }
});

// GET /courses - Get all courses 
app.get('/courses', async (req, res) => {
  const { name, code } = req.query;

  try {
    const courses = await prisma.course.findMany({
      where: {
        name: name ? String(name) : undefined,
        code: code ? String(code) : undefined
      }
    });
    res.json(courses);
  } catch (err) {
    res.status(400).json({ error: 'Error fetching courses', details: err });
  }
});

// POST /courses - Create a new course
app.post('/courses', async (req, res) => {
  const { name, code } = req.body;
  try {
    const course = await prisma.course.create({
      data: {
        name,
        code
      }
    });
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: 'Error creating course', details: err });
  }
});

// PUT /courses/:id - Edit a course
app.put('/courses/:id', async (req, res) => {
  const { id } = req.params;
  const { name, code } = req.body;

  try {
    const updatedCourse = await prisma.course.update({
      where: { id },
      data: { name, code }
    });
    res.json(updatedCourse);
  } catch (err) {
    res.status(400).json({ error: 'Error updating course', details: err });
  }
});

// DELETE /courses/:id - delete a course
app.delete('/courses/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCourse = await prisma.course.delete({
      where: { id }
    });
    res.json({ message: 'Curso eliminado correctamente', deletedCourse });
  } catch (err) {
    res.status(400).json({ error: 'Error deleting course', details: err });
  }
});

// GET /enrollments - Get all enrollments
app.get('/enrollments', async (req, res) => {
  try {
    const enrollments = await prisma.studentCourse.findMany({
      include: {
        student: true,
        course: true
      }
    });
    res.json(enrollments);
  } catch (err) {
    res.status(400).json({ error: 'Error fetching enrollments', details: err });
  }
});

// POST /enrollments - Enroll a student in a course
app.post('/enrollments', async (req, res) => {
  const { student_id, course_id } = req.body;
  try {
    const enrollment = await prisma.studentCourse.create({
      data: {
        student_id,
        course_id
      }
    });
    res.status(201).json(enrollment);
  } catch (err) {
    res.status(400).json({ error: 'Error enrolling student', details: err });
  }
});

// DELETE /enrollments/:id - delete an enrollment
app.delete('/enrollments/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await prisma.studentCourse.delete({
      where: { id }
    });
    res.json({ message: 'Matrícula eliminada correctamente', deleted });
  } catch (err) {
    res.status(400).json({ error: 'Error deleting enrollment', details: err });
  }
});

// GET /students/:id/courses - Get courses of a student
app.get('/students/:id/courses', async (req, res) => {
  const { id } = req.params;
  try {
    const courses: (StudentCourse & { course: Course })[] = await prisma.studentCourse.findMany({
      where: { student_id: id },
      include: { course: true }
    });

    res.json(courses.map((e) => e.course));
  } catch (err) {
    res.status(400).json({ error: 'Error fetching student courses', details: err });
  }
});

// GET /courses/:id/students - Get students of a course
app.get('/courses/:id/students', async (req, res) => {
  const { id } = req.params;
  try {
    const students: (StudentCourse & { student: User })[] = await prisma.studentCourse.findMany({
      where: { course_id: id },
      include: { student: true }
    });

    res.json(students.map((e) => e.student));
  } catch (err) {
    res.status(400).json({ error: 'Error fetching course students', details: err });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});