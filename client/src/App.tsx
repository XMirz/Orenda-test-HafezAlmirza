import React, { useState } from "react";
import Sidebar from "./components/SideBar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProductPage from "./pages/Product";
import TopBar from "./components/TopBar";
import { Toaster } from "components/ui/toaster";
import CreateCustomersPage from "pages/customers/create";
import IndexCustomersPage from "pages/customers";
import UpdateCustomersPage from "pages/customers/update";

function App() {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <>
      <div className="h-screen w-screen overflow-x-hidden overflow-y-hidden font-nunito bg-gray-50">
        <div className="h-full overflow-x-hidden w-full flex flex-row ">
          <Sidebar showSidebar={showSidebar} />
          <div className="flex-1 flex flex-col overflow-y-auto">
            <TopBar />
            <main className="flex-1 ">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/customers" element={<IndexCustomersPage />} />
                <Route
                  path="/customers/new"
                  element={<CreateCustomersPage />}
                />
                <Route path="/customers/*" element={<UpdateCustomersPage />} />
                <Route path="/products" element={<ProductPage />} />
                {/* <Route path="/*" element={<ProductPage />} /> */}
              </Routes>
            </main>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default App;
