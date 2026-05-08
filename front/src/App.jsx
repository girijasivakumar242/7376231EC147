import { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://4.224.186.213/evaluation-service/notifications';
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJnaXJpamFzLmVjMjNAYml0c2F0aHkuYWMuaW4iLCJleHAiOjE3NzgyMzQyMTQsImlhdCI6MTc3ODIzMzMxNCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjZlOWY0NmE2LTQ0ZTQtNGE5MC05M2ZlLWI0ZTNlZWY2OTVmYyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImdpcmlqYSIsInN1YiI6IjkxOTM2YTg3LTE3ZGEtNDk0Yy04NjNlLTMxNTEzMTJhYjk4YSJ9LCJlbWFpbCI6ImdpcmlqYXMuZWMyM0BiaXRzYXRoeS5hYy5pbiIsIm5hbWUiOiJnaXJpamEiLCJyb2xsTm8iOiI3Mzc2MjMxZWMxNDciLCJhY2Nlc3NDb2RlIjoidUthSmZtIiwiY2xpZW50SUQiOiI5MTkzNmE4Ny0xN2RhLTQ5NGMtODYzZS0zMTUxMzEyYWI5OGEiLCJjbGllbnRTZWNyZXQiOiJERmpnR3Z4Y0dQVXpkcnJRIn0.HoqLmjsyJ-zpKeAS5J21tlBHBTlLPnuWFHLrXn7yqDI';

const sampleNotifications = [
  { ID: 'sample-1', Type: 'Placement', Message: 'Company hiring drive starting soon', Timestamp: '2026-05-08 18:00:00' },
  { ID: 'sample-2', Type: 'Result', Message: 'Semester results available', Timestamp: '2026-05-08 17:45:00' },
  { ID: 'sample-3', Type: 'Event', Message: 'Campus fest registration open', Timestamp: '2026-05-08 17:30:00' },
];

function App() {
  const [notifications, setNotifications] = useState([]);
  const [topNotifications, setTopNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fallback, setFallback] = useState(false);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized: access token invalid or expired');
        }
        throw new Error('Failed to fetch notifications');
      }
      const data = await response.json();
      setNotifications(data.notifications || []);
      setFallback(false);
      setError(null);
    } catch (err) {
      setError(err.message);
      setNotifications(sampleNotifications);
      setFallback(true);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityWeight = (type) => {
    switch (type) {
      case 'Placement': return 3;
      case 'Result': return 2;
      case 'Event': return 1;
      default: return 0;
    }
  };

  const sortNotifications = (nots) => {
    return nots
      .map(not => ({ ...not, weight: getPriorityWeight(not.Type), date: new Date(not.Timestamp) }))
      .sort((a, b) => {
        if (a.weight !== b.weight) {
          return b.weight - a.weight;
        }
        return b.date - a.date;
      })
      .slice(0, 10);
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTopNotifications(sortNotifications(notifications));
  }, [notifications]);

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-title">Priority Inbox</div>
      </header>

      {loading && <div className="status-message">Loading...</div>}
      {error && fallback && (
        <div className="status-message error">Warning: {error}. Showing sample notifications.</div>
      )}
      {error && !fallback && (
        <div className="status-message error">Error: {error}</div>
      )}

      {!loading && topNotifications.length > 0 && (
        <div className="notifications">
          {topNotifications.map(not => (
            <div key={not.ID} className="notification-card">
              <div className="notification-type">{not.Type}</div>
              <div className="notification-message">{not.Message}</div>
              <div className="notification-timestamp">{not.Timestamp}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
