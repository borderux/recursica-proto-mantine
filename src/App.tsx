import { Navigate, Routes, Route } from "react-router";
import Home from "./routes/Home";
import UsageInfo from "./routes/UsageInfo";
import { prototypes } from "./routes/prototypes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/usage-info" element={<UsageInfo />} />
      {prototypes.map(({ slug, Component }) => (
        <Route
          key={slug}
          path={`/prototypes/${slug}`}
          element={<Component />}
        />
      ))}
      {/* Catches unmatched paths (e.g. bare /prototypes, typos) — without
          this, React Router renders nothing instead of the home page. */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
