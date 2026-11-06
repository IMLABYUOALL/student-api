import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Students() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function fetchStudents() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('http://localhost:3000/api/students', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 401) {
          logout();
          navigate('/login', { replace: true });
          return;
        }
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data = await res.json();
        if (!cancelled) setStudents(Array.isArray(data) ? data : data.students || []);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load students');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchStudents();
    return () => { cancelled = true; };
  }, [token, logout, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="students-container">
      <div className="students-header">
        <h1>Students</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {loading && <p>Loading students…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && students.length === 0 && <p>No students found.</p>}

      <ul className="student-list">
        {students.map((s) => (
          <li key={s._id || s.id || s.email}>
            <strong>{s.name}</strong>
            <span>{s.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}