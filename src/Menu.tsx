import React, { useState } from "react";
import AddTrain from "./addTrain";
import TrainSchedule from "./TrainSchedule";
import { useNavigate } from "react-router";
import "./menu.css";

interface MenuProps {
  username: string;
}

enum DialogType {
  AddTrain = "AddTrain",
  TrainSchedule = "TrainSchedule",
}

function Menu({ username }: MenuProps) {
  const [currDialogType, setCurrDialogType] = React.useState("");
  const navigate = useNavigate();

  const closeDialog = () => {
    setCurrDialogType("");
  };

  const handleCurrDialogType = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCurrDialogType(event.currentTarget.name);
  };

  return (
    <>
      <div className="menuBody">
        <h1>Menu</h1>
        <h2>Username: {username}</h2>
        <button name="TrainSchedule" onClick={()=>navigate("/schedule")}>Schedule</button>
        <button name={DialogType.AddTrain} onClick={handleCurrDialogType}>
          Add
        </button>
      </div>
      <AddTrain
        open={currDialogType === DialogType.AddTrain}
        closeForm={closeDialog}
      />
    </>
  );
}

export default Menu;
