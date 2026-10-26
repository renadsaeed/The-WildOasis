import React from "react";
import GlobalStyles from "./styles/GlobalStyles";
import styled from "styled-components";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {DarkModeProvider} from "./context/DarkModeContext";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Checkin from "./pages/Checkin";

import Users from "./pages/Users";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import ProtectRoute from "./ui/ProtectRoute";
const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // staleTime: 60 * 1000,
        staleTime: 0,
      },
    },
  });
  return (
    <>
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectRoute> <AppLayout /> </ProtectRoute>}>
              <Route index element={<Navigate replace to="Dashboard" />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/Bookings" element={<Bookings />} />
              <Route path="/Bookings/:bookingId" element={<Booking />} />
              <Route path="/Checkin/:bookingId" element={<Checkin />} />
              <Route path="/Cabins" element={<Cabins />} />
              <Route path="/Account" element={<Account />} />

              <Route path="/Settings" element={<Settings />} />
              <Route path="/Users" element={<Users />} />
            </Route>

            <Route path="/Login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
            
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
      </DarkModeProvider>
    </>
  );
};

export default App;
