import { useEffect, useState } from 'react';

type Student = {
  id: string;
  first_name: string;
  second_name: string | null;
  last_name: string;
  second_last_name: string | null;
  carnet_number: string;
};

type Course = {
  id: string;
  name: string;
  code: string;
};

export default function EnrollmentPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch('http://localhost:3000/students');
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await fetch('http://localhost:3000/courses');
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent || !selectedCourse) {
      setMessage('Por favor selecciona un estudiante y un curso.');
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('http://localhost:3000/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: selectedStudent,
          course_id: selectedCourse,
        }),
      });

      if (res.ok) {
        setMessage('Matrícula creada exitosamente 🎉');
        setSelectedStudent('');
        setSelectedCourse('');
      } else {
        const errorData = await res.json();
        setMessage(`Error: ${errorData.error || 'No se pudo crear la matrícula'}`);
      }
    } catch (error) {
      setMessage('Error en la conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded shadow">
      <h1 className="text-3xl font-extrabold mb-6 text-center">Crear Matrícula</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="student" className="block font-semibold mb-1">
            Selecciona Estudiante
          </label>
          <select
            id="student"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Elige un estudiante --</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.first_name} {s.second_name || ''} {s.last_name} {s.second_last_name || ''} — {s.carnet_number}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="course" className="block font-semibold mb-1">
            Selecciona Curso
          </label>
          <select
            id="course"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Elige un curso --</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} — {c.code}
              </option>
            ))}
          </select>
        </div>

        {message && (
          <p
            className={`text-center font-semibold ${
              message.startsWith('Error') ? 'text-red-600' : 'text-green-600'
            }`}
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold transition"
        >
          {loading ? 'Guardando...' : 'Matricular'}
        </button>
      </form>
    </div>
  );
}
