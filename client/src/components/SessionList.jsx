import React, { useState, useEffect } from "react";

function SessionList({ routineId }) {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    // Function to fetch practice sessions data
    async function fetchSessions(routineId) {
      try {
        const response = await fetch(
          `http://localhost:3000/getSessions/${routineId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch sessions");
        }

        const data = await response.json();
        setSessions(data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    }
    console.log(routineId);
    fetchSessions(routineId);
  }, [routineId]);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {sessions.map((session) => (
        <div
          key={session.practice_sessions_id}
          style={{
            width: "400px",
            margin: "20px",
            padding: "20px",
            border: "1px solid #ccc",
          }}
        >
          <h3>{session.description}</h3>
          <p>BPM: {session.bpm}</p>
          <audio controls>
            <source
              src={`http://localhost:3000/${session.filepath}`}
              type="audio/mpeg"
            />
          </audio>
        </div>
      ))}
    </div>
  );
}

export default SessionList;
