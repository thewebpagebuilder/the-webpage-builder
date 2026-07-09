import { HashRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import GalleryPage from "./pages/GalleryPage";
import BookPage from "./pages/BookPage";
import ContactPage from "./pages/ContactPage";
import ResourcesPage from "./pages/ResourcesPage";
import NotFound from "./pages/NotFound";
import {
  DentalImplantsGuide,
  AlignersVsBraces,
  RootCanalGuide,
  BrushingFlossingGuide,
  FirstVisitGuide,
  PostTreatmentCare,
} from "./pages/resources";

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/dental-implants" element={<DentalImplantsGuide />} />
          <Route path="/resources/aligners-vs-braces" element={<AlignersVsBraces />} />
          <Route path="/resources/root-canal" element={<RootCanalGuide />} />
          <Route path="/resources/brushing-flossing" element={<BrushingFlossingGuide />} />
          <Route path="/resources/first-visit" element={<FirstVisitGuide />} />
          <Route path="/resources/post-treatment" element={<PostTreatmentCare />} />
          <Route path="/book" element={<BookPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
