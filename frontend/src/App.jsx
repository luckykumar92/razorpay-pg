import React from "react";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="min-h-screen">
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
