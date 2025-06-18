import { useEffect, useState } from 'react';

type Student = {
  id: string;
  first_name: string;
  second_name?: string;
  last_name: string;
  second_last_name?: string;
  carnet_number: string;
};

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Student>>({});

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await fetch('http://localhost:3000/students');
    const data = await res.json();
    setStudents(data);
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('¿Estás seguro que deseas eliminar este estudiante?');
    if (!confirm) return;

    await fetch(`http://localhost:3000/students/${id}`, {
      method: 'DELETE',
    });
    fetchStudents();
  };

  const handleEdit = (student: Student) => {
    setEditingId(student.id);
    setForm(student);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await fetch(`http://localhost:3000/students/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setEditingId(null);
    setForm({});
    fetchStudents();
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 text-center">Estudiantes Matriculados</h1>
      <ul className="space-y-6">
        {students.map((s) => (
          <li key={s.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            {editingId === s.id ? (
              <div className="space-y-4">
                <input
                  name="first_name"
                  value={form.first_name || ''}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Nombre"
                />
                <input
                  name="second_name"
                  value={form.second_name || ''}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Segundo nombre"
                />
                <input
                  name="last_name"
                  value={form.last_name || ''}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Apellido"
                />
                <input
                  name="second_last_name"
                  value={form.second_last_name || ''}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Segundo apellido"
                />
                <input
                  name="carnet_number"
                  value={form.carnet_number || ''}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Carnet"
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
                  <p className="font-bold text-lg text-gray-900">{s.first_name} {s.second_name} {s.last_name} {s.second_last_name}</p>
                  <p className="text-sm text-gray-500 mt-1">Carnet: <span className="font-mono">{s.carnet_number}</span></p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(s)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
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
