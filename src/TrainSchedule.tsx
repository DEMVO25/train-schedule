import React, { useEffect, useState } from "react";
import "./trainSchedule.css";
import Dialog from "./components/dialog";

interface Train {
  trainnumber: string;
  startstation: string;
  endstation: string;
  departuretime: string;
  arrivaltime: string;
  startdirection: string;
  enddirection: string;
}

function TrainSchedule() {
  const [trains, setTrains] = useState<Train[]>([]);

  useEffect(() => {
    fetch("/getTrains")
      .then((res) => res.json())
      .then((data) => setTrains(data))
      .catch((err) => {
        console.error("Failed to fetch trains:", err);
      });
  }, []);

  const deleteHandle = (trainnumber: string) => {
    if (!window.confirm("Are you sure you want to delete this train?")) return;

    fetch(`/deleteTrain/${trainnumber}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setTrains((prev) =>
            prev.filter((t) => t.trainnumber !== trainnumber)
          );
        } else {
          alert("Failed to delete train");
        }
      })
      .catch((err) => {
        console.error("Delete failed:", err);
        alert("Server error");
      });
  };

  const [editingTrain, setEditingTrain] = useState<Train | null>(null);

  const handleUpdate = () => {
    if (!editingTrain) return;

    fetch(`/updateTrain/${editingTrain.trainnumber}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editingTrain),
    })
      .then((res) => {
        if (res.ok) {
          setTrains((prev) =>
            prev.map((t) =>
              t.trainnumber === editingTrain.trainnumber ? editingTrain : t
            )
          );
          setEditingTrain(null);
          alert("Train updated successfully");
        } else {
          alert("Failed to update train");
        }
      })
      .catch((err) => {
        console.error("Update failed:", err);
        alert("Server error");
      });
  };

  return (
    <div>
      <div className="train-schedule">
        <h2>Train Schedule</h2>
        <table>
          <thead>
            <tr>
              <th>Train Number</th>
              <th>From Station</th>
              <th>To Station</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Heading From</th>
              <th>Heading To</th>
            </tr>
          </thead>
          <tbody>
            {trains.map((train, i) => (
              <tr key={i}>
                <td>{train.trainnumber}</td>
                <td>{train.startstation}</td>
                <td>{train.endstation}</td>
                <td>{train.departuretime}</td>
                <td>{train.arrivaltime}</td>
                <td>{train.startdirection}</td>
                <td>{train.enddirection}</td>
                <td>
                  <button onClick={() => deleteHandle(train.trainnumber)}>
                    🗑
                  </button>
                </td>
                <td>
                  <button onClick={() => setEditingTrain(train)}> ✏️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dialog open={!!editingTrain} title="Edit Train" closeForm={() => setEditingTrain(null)}>
  {editingTrain && (
    <div className="edit-form">
      <input
        value={editingTrain.startstation}
        onChange={(e) =>
          setEditingTrain({ ...editingTrain, startstation: e.target.value })
        }
        placeholder="Start Station"
      />
      <input
        value={editingTrain.endstation}
        onChange={(e) =>
          setEditingTrain({ ...editingTrain, endstation: e.target.value })
        }
        placeholder="End Station"
      />
      <input
        type="time"
        min="00:00"
        max="23:59"
        value={editingTrain.departuretime}
        onChange={(e) =>
          setEditingTrain({
            ...editingTrain,
            departuretime: e.target.value,
          })
        }
        placeholder="Departure Time"
      />
      <input
        type="time"
        min="00:00"
        max="23:59"
        value={editingTrain.arrivaltime}
        onChange={(e) =>
          setEditingTrain({ ...editingTrain, arrivaltime: e.target.value })
        }
        placeholder="Arrival Time"
      />
      <input
        value={editingTrain.startdirection}
        onChange={(e) =>
          setEditingTrain({
            ...editingTrain,
            startdirection: e.target.value,
          })
        }
        placeholder="Start Direction"
      />
      <input
        value={editingTrain.enddirection}
        onChange={(e) =>
          setEditingTrain({ ...editingTrain, enddirection: e.target.value })
        }
        placeholder="End Direction"
      />
      <div style={{ marginTop: "1rem" }}>
        <button onClick={handleUpdate}>Save</button>
        <button onClick={() => setEditingTrain(null)} style={{ marginLeft: "0.5rem" }}>
        Cancel
        </button>
      </div>
    </div>
  )}
</Dialog>

    </div>
  );
}

export default TrainSchedule;
