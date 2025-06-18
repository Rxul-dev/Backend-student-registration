import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import StudentsPage from './pages/StudentsPage';
import CoursesPage from './pages/CoursesPage';
import EnrollmentPage from './pages/RegistrationPage';


export default function App() {
  return (
    <BrowserRouter>
      <div className="max-w-7xl mx-auto p-8">
        {/* Título fijo */}
        <h1 className="text-5xl font-extrabold text-center mb-8 text-gray-800">
          Sistema de Matrícula
        </h1>

        {/* Navegación de tabs */}
        <nav className="flex justify-center space-x-8 border-b border-gray-300 mb-6 bg-white shadow-sm">
          <NavLink
            to="/tab1"
            className={({ isActive }) =>
              isActive
                ? 'border-b-4 border-blue-600 text-blue-700 font-semibold pb-3'
                : 'text-gray-600 hover:text-blue-600 pb-3 border-b-4 border-transparent'
            }
          >
            Lista de Estudiantes
          </NavLink>
          <NavLink
            to="/tab2"
            className={({ isActive }) =>
              isActive
                ? 'border-b-4 border-blue-600 text-blue-700 font-semibold pb-3'
                : 'text-gray-600 hover:text-blue-600 pb-3 border-b-4 border-transparent'
            }
          >
            Lista de Cursos
          </NavLink>
          <NavLink
            to="/tab3"
            className={({ isActive }) =>
              isActive
                ? 'border-b-4 border-blue-600 text-blue-700 font-semibold pb-3'
                : 'text-gray-600 hover:text-blue-600 pb-3 border-b-4 border-transparent'
            }
          >
            Matricular Estudiante
          </NavLink>
        </nav>

        {/* Contenido de tabs */}
        <main>
          <Routes>
            <Route path="/tab1" element={<StudentsPage />} />
            <Route path="/tab2" element={<CoursesPage />} />
            <Route path="/tab3" element={<EnrollmentPage />} />
            <Route path="*" element={<StudentsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
