import { useEffect, useState } from 'react';

type Course = {
  id: string;
  name: string;
  code: string;
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Course>>({});

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const res = await fetch('http://localhost:3000/courses');
    const data = await res.json();
    setCourses(data);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('¿Estás seguro que deseas eliminar este curso?');
    if (!confirmDelete) return;

    await fetch(`http://localhost:3000/courses/${id}`, {
      method: 'DELETE',
    });
    fetchCourses();
  };

  const handleEdit = (course: Course) => {
    setEditingId(course.id);
    setForm(course);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!editingId) return;
    await fetch(`http://localhost:3000/courses/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setEditingId(null);
    setForm({});
    fetchCourses();
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 text-center">Cursos Disponibles</h1>
      <ul className="space-y-6">
        {courses.map((course) => (
          <li
            key={course.id}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
          >
            {editingId === course.id ? (
              <div className="space-y-4">
                <input
                  name="name"
                  value={form.name || ''}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Nombre del curso"
                />
                <input
                  name="code"
                  value={form.code || ''}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Código del curso"
                />
                <div className="flex justify-end gap-4">
                  <button
                    onClick={handleSave}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold px-6 py-2 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-lg text-gray-900">{course.name}</p>
                  <p className="text-sm text-gray-500 mt-1">Código: <span className="font-mono">{course.code}</span></p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(course)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
