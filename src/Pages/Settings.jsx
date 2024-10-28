import React, { useState } from "react";
import { Tabs } from "antd";
import Users from "../components/Users";
import Products from "../components/Products";

const Settings = () => {
  return (
    <div className="pt-20 pl-40 border-slate-200 border-3 w-full h-screen flex  ">
      <div className=" w-full h-screen pl-1 flex justify-start ">
        <Tabs defaultActiveKey="1" type="card" className="w-full ">
          <Tabs.TabPane tab="Users" key="1" className="pt-0">
            <Users /> {/* Afficher le composant Users dans cet onglet */}
          </Tabs.TabPane>

          <Tabs.TabPane tab="Products" key="2">
            <Products /> {/* Afficher le composant Products dans cet onglet */}
          </Tabs.TabPane>
        </Tabs>
        <div></div>
      </div>
    </div>
  );
};

export default Settings;
