import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import Topbar from "./Admin/scenes/global/Topbar";
import Sidebar from "./Admin/scenes/global/Sidebar";
import Dashboard from "./Admin/scenes/dashboard/Dashboard";
import Team from "./Admin/scenes/team";
import Invoices from "./Admin/scenes/invoices";
import Contacts from "./Admin/scenes/contacts";
import Bar from "./Admin/scenes/bar";
import Form from "./Admin/scenes/form";
import Line from "./Admin/scenes/line";
import Pie from "./Admin/scenes/pie";
import FAQ from "./Admin/scenes/faq";
import Geography from "./Admin/scenes/geography";
import NotFound from "./pages/NotFound";

export default function Admin() {
    return (
        <>
            //<Topbar />
            //<Sidebar />
            <Routes>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/team" element={<Team />} />
                <Route path="/admin/contacts" element={<Contacts />} />
                <Route path="/admin/invoices" element={<Invoices />} />
                <Route path="/admin/form" element={<Form />} />
                <Route path="/admin/bar" element={<Bar />} />
                <Route path="/admin/pie" element={<Pie />} />
                <Route path="/admin/line" element={<Line />} />
                <Route path="/admin/faq" element={<FAQ />} />
                <Route path="/admin/geography" element={<Geography />} />
                <Route path="/admin/*" element={<NotFound />} />
            </Routes>
        </>
    );
}
