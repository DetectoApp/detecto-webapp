import React from 'react';
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
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

export const AuthedOutlet = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const location = useLocation();

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate
      to={location.pathname ? `/login?from=${location.pathname}` : '/login'}
    />
  );
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
              <Route element={<AuthedOutlet isLoggedIn={isLoggedIn} />}>
                <Route path="/demoadd" element={<AddClinicalCase />} />
                {/* <Route path="/demoadd/exam" element={<AddClinicalCaseExam />} /> */}
                <Route path="/list" element={<ClinicalCaseList />} />
                <Route path="/case/:id" element={<ClinicalCaseDetails />} />
                <Route path="/profile" element={<Profile />} />
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
