import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import TemplateSelection from './pages/TemplateSelection';
import PersonalInfoForm from './pages/PersonalInfoForm';
import ExperienceEditor from './pages/ExperienceEditor';
import EducationEditor from './pages/EducationEditor';
import SkillsEditor from './pages/SkillsEditor';
import ReviewDownload from './pages/ReviewDownload';
import SubscriptionPayment from './pages/SubscriptionPayment';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/templates" element={<TemplateSelection />} />
        <Route path="/personal-info" element={<PersonalInfoForm />} />
        <Route path="/experience" element={<ExperienceEditor />} />
        <Route path="/education" element={<EducationEditor />} />
        <Route path="/skills" element={<SkillsEditor />} />
        <Route path="/review" element={<ReviewDownload />} />
        <Route path="/subscription" element={<SubscriptionPayment />} />
      </Routes>
    </Router>
  );
}