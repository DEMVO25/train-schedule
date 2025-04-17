import React from "react";
import Dialog from "./components/dialog";
import "./addTrain.css";

interface AddTrainProps {
  open: boolean;
  closeForm: () => void;
}

interface TrainData {
  trainnumber: string;
  startstation: string;
  endstation: string;
  departuretime: string;
  arrivaltime: string;
  startdirection: string;
  enddirection: string;
}

function AddTrain({ open, closeForm }: AddTrainProps) {
  const [trainData, setTrainData] = React.useState<TrainData>({
    trainnumber: "",
    startstation: "",
    endstation: "",
    departuretime: "",
    arrivaltime: "",
    startdirection: "",
    enddirection: "",
  });

  const saveHandler = async () => {
    try {
      const response = await fetch("/addTrain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trainData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Something went wrong while saving the train");
      } else {
        alert("Record added successfully");
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("Failed to connect to the server");
    }
  };

  return (
    <Dialog open={open} closeForm={closeForm} title="Add Train">
      <div className="dialogContent">
        <h2>Train Details</h2>
        <input
          name="startstation"
          value={trainData.startstation}
          onChange={(e) =>
            setTrainData({
              ...trainData,
              startstation: e.target.value,
            })
          }
          placeholder="Station of the start"
        />

        <input
          name="endstation"
          value={trainData.endstation}
          onChange={(e) =>
            setTrainData({
              ...trainData,
              endstation: e.target.value,
            })
          }
          placeholder="Station of the end"
        />

        <input
          type="time"
          min="00:00"
          max="23:59"
          name="departuretime"
          value={trainData.departuretime}
          onChange={(e) =>
            setTrainData({
              ...trainData,
              departuretime: e.target.value,
            })
          }
          placeholder="Departure time"
        />

        <input
          type="time"
          min="00:00"
          max="23:59"
          name="arrivaltime"
          value={trainData.arrivaltime}
          onChange={(e) =>
            setTrainData({
              ...trainData,
              arrivaltime: e.target.value,
            })
          }
          placeholder="Arrival time"
        ></input>
        <input
          name="startdirection"
          value={trainData.startdirection}
          onChange={(e) =>
            setTrainData({
              ...trainData,
              startdirection: e.target.value,
            })
          }
          placeholder="Start direction"
        ></input>
        <input
          name="trainnumber"
          value={trainData.trainnumber}
          onChange={(e) =>
            setTrainData({
              ...trainData,
              trainnumber: e.target.value,
            })
          }
          placeholder="Train number"
        ></input>
        <input
          name="enddirection"
          value={trainData.enddirection}
          onChange={(e) =>
            setTrainData({
              ...trainData,
              enddirection: e.target.value,
            })
          }
          placeholder="End direction"
        ></input>
        <button onClick={saveHandler}>Save</button>
      </div>
    </Dialog>
  );
}

export default AddTrain;
