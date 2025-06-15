import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ReviewPage from "../pages/ReviewPage";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/review" element={<ReviewPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}