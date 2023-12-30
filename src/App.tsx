import { Routes, Route } from "react-router-dom";

import * as pages from "./pages";
import * as components from "./components";

function App() {
  return (
    <Routes>
      <Route element={<components.AppLayout />}>
        {/* public routes  */}
        <Route element={<components.AuthLayout />}>
          <Route index element={<pages.HomePage />} />
          <Route path="/sign-in" element={<pages.SignInPage />} />
          <Route
            path="/account/forgot-password"
            element={<pages.ForgotPasswordPage />}
          />
          <Route
            path="/account/reset-password"
            element={<pages.ResetPasswordPage />}
          />
          /dashboard
        </Route>

        {/* protected routes */}
        <Route element={<components.PersistLogin />}>
          <Route element={<components.RequireAuth />}>
            <Route element={<components.DashBoardLayout />}>
              <Route
                path="/dashboard/shipment"
                element={<pages.ShipmentPage />}
              />
              <Route
                path="/dashboard/shipment/new"
                element={<pages.AddShipmentPage />}
              />
              <Route
                path="/dashboard/shipment/edit/:id"
                element={<pages.EditShipmentPage />}
              />
              <Route
                path="/dashboard/profile"
                element={<pages.ProfilePage />}
              />
            </Route>
          </Route>
        </Route>

        {/* catch-all route*/}
        <Route path="*" element={<pages.NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
