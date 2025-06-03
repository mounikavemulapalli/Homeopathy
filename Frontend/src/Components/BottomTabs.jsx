import React, { useState } from "react";
import CaseSheetForm from "./CaseSheetForm";
import FollowUpForm from "./FollowUpForm";
import CasesList from "./CasesList";
import Navbar from "./Navbar";

const BottomTabs = () => {
  const [activeTab, setActiveTab] = useState("newCase");

  const renderTabContent = () => {
    switch (activeTab) {
      case "newCase":
        return <CaseSheetForm />;
      case "followUp":
        return <FollowUpForm />;
      case "cases":
        return <CasesList />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow overflow-y-auto">{renderTabContent()}</div>

      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-inner border-t border-gray-300 flex justify-around text-center py-2">
        <button
          onClick={() => setActiveTab("newCase")}
          className={`flex-1 py-2 ${
            activeTab === "newCase" ? "text-blue-600 font-semibold" : "text-gray-600"
          }`}
        >
          New Case
        </button>
        <button
          onClick={() => setActiveTab("followUp")}
          className={`flex-1 py-2 ${
            activeTab === "followUp" ? "text-blue-600 font-semibold" : "text-gray-600"
          }`}
        >
          Follow Up
        </button>
        <button
          onClick={() => setActiveTab("cases")}
          className={`flex-1 py-2 ${
            activeTab === "cases" ? "text-blue-600 font-semibold" : "text-gray-600"
          }`}
        >
          Cases
        </button>
      </div>
    </div>
  );
};

export default BottomTabs;
