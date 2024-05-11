import React from "react";
import { PracticeForm } from "../components/PracticeForm";
import { PracticeList } from "../components/PracticeRoutineList";

export const Practice = () => {
  return (
    <div className="mx-40 my-12">
      <PracticeForm />
      <br />
      <PracticeList />
    </div>
  );
};
