
import { useState } from "react";
import { supabase } from "./lib/supabase";

// import DemoSecurityTest from "./components/demo/DemoSecurityTest";

// Dashboard
import Dashboard from "./components/Dashboard";

// Public demo components
import DemoFamilyMembers from "./components/demo/DemoFamilyMembers";
import DemoFamilyRelationships from "./components/demo/DemoFamilyRelationships";
import DemoFamilyTree from "./components/demo/DemoFamilyTree";

// Styles
import "./App.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const demoProfile = {
    display_name: "Demo Visitor",
    role: "viewer",
    approved: true,
  };

  function handleBackToDashboard() {
    setCurrentPage("dashboard");
  }

  if (currentPage === "members") {
    return (
      <DemoFamilyMembers
        onBack={handleBackToDashboard}
      />
    );
  }

  if (currentPage === "relationships") {
    return (
      <DemoFamilyRelationships
        onBack={handleBackToDashboard}
      />
    );
  }

  if (currentPage === "tree") {
    return (
      <DemoFamilyTree
        onBack={handleBackToDashboard}
      />
    );
  }

  return (
    <Dashboard
      profile={demoProfile}
      isDemo={true}
      onOpenMembers={() => setCurrentPage("members")}
      onOpenRelationships={() => setCurrentPage("relationships")}
      onOpenTree={() => setCurrentPage("tree")}
    />

    // <DemoSecurityTest />

  );


}
