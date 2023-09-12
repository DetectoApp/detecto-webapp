import React from 'react';
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import AppHeader from './components/layout/AppHeader';
import ClinicalCaseDetails from './components/pages/clinicalcase/details/ClinicalCaseDetails';
import ClinicalCaseList from './components/pages/clinicalcase/ClinicalCaseList';
import AddClinicalCase from './components/pages/mock/AddClinicalCase';
import Login from './components/pages/user/Login';
import Register from './components/pages/user/Register';
import { AuthProvider, useAuth } from './components/providers/AuthProvider';
import Profile from './components/pages/user/Profile';
import Homepage from './components/pages/Homepage';
import AddClinicalCaseExam from './components/pages/mock/AddClinicalCaseExam';
import AddClinicalCaseTalk from './components/pages/mock/AddClinicalCaseTalk';
import { Flex } from '@chakra-ui/react';
import './styles.css';

export const AuthedOutlet = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to={'/login'} />;
};

export default function App() {
  return (
    <Flex direction="column" maxW="1048px" mx="auto" px="4" minH="100vh">
      <AuthProvider>
        {isLoggedIn => (
          <BrowserRouter basename="detecto-webapp">
            <AppHeader />
            <Routes>
              {/* public */}
              <Route path="/" element={<Homepage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              {/* auth */}
              <Route path="/demoadd" element={<AuthedOutlet />}>
                <Route element={<AddClinicalCase />} />
              </Route>
              <Route path="/demoadd/exam" element={<AuthedOutlet />}>
                <Route element={<AddClinicalCaseExam />} />
              </Route>
              <Route path="/demoadd/talk" element={<AuthedOutlet />}>
                <Route element={<AddClinicalCaseTalk />} />
              </Route>
              <Route path="/list" element={<AuthedOutlet />}>
                <Route element={<ClinicalCaseList />} />
              </Route>
              <Route path="/case/:id" element={<AuthedOutlet />}>
                <Route element={<ClinicalCaseDetails />} />
              </Route>
              <Route path="/profile" element={<AuthedOutlet />}>
                <Route element={<Profile />} />
              </Route>

              {/* helper */}
              <Route path="*" element={<span>404</span>} />
            </Routes>
          </BrowserRouter>
        )}
      </AuthProvider>
    </Flex>
  );
}
