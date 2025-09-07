import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Home-Page/Home.jsx";
import { Login } from "./Login-Page/Login.jsx";
import { Signup } from "./Login-Page/Signup";
import { ForgotPassword } from "./Login-Page/ForgotPassword.jsx";
import { ManageStations } from "./Manage-Station/ManageStations.jsx";
import { ManageTrack } from "./Manage-Track-Page/ManageTrack.jsx";
import { ManageTrains } from "./Manage-Trains-Page/ManageTrains.jsx";
import { MockMode } from "./Mock-Mode-Page/MockMode.jsx";
import { ScenarioModeling } from "./Scenario-Modeling-Page/ScenarioModeling.jsx";
import { Layout } from "./Layout.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Scenario+Modeling" element={<ScenarioModeling />} />
          <Route path="/Mock+Mode" element={<MockMode />} />
          <Route path="/Manage+Trains" element={<ManageTrains />} />
          <Route path="/Manage+Tracks" element={<ManageTrack />} />
          <Route path="/Manage+Stations" element={<ManageStations />} />
          <Route path="/Conflicts+Disruptions" element={<ManageStations />} />
          <Route path="/Data+Analytics" element={<ManageStations />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
