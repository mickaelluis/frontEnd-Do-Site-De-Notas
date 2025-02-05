import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './screens/Home.tsx';
import Login from './screens/Login.tsx';
import Register from './screens/register.tsx'
import Notes from './screens/CreateNote.tsx'
import ViewNotes from './screens/ViewNotes.tsx';
import EditNotes from './screens/EditNote.tsx';
import { AuthProvider } from './services/AuthProvider.tsx';
import PrivateRoute from './services/PrivateRoute.tsx';
import ResultadoDeBusca from './screens/Resultado.tsx';


const AppRoutes = () => (
        <AuthProvider>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute />}>
        <Route path="/newNotes" element={<Notes />} />
        <Route path="/viewNotes" element={<ViewNotes />} />
        <Route path="/edit-note/:id" element={<EditNotes />} />
        <Route path="/search/query" element={< ResultadoDeBusca />} />
        </Route>
    </Routes>
        </AuthProvider>
);

export default AppRoutes;