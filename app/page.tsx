import TaskForm from "@/components/TaskForm";
import { TaskTable } from "@/components/TaskTable";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <TaskForm />
      <TaskTable />
    </div>
  );
};

export default HomePage;
