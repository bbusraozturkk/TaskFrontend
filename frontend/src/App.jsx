import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DocumentList from './pages/DocumentList';
import DocumentDetail from './pages/DocumentDetail';
import AddRevision from './pages/AddRevision'; 
import NewDocument from './pages/NewDocument';
import RemarkPage from './pages/RemarkPage';
import RemarkList from './pages/RemarkList';
import Summary from './pages/Summary';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DocumentList />} />
        <Route path="/documents/:id" element={<DocumentDetail />} />
        <Route path="/revisions/:id/new" element={<AddRevision />} />
        <Route path="/documents/new" element={<NewDocument />} />
        <Route path="/notlar/:revisionId" element={<RemarkPage />} />
        <Route path="/notlar/:revisionId" element={<RemarkList />} />
        <Route path="/ozet" element={<Summary />} />
      </Routes>
    </Router>
  );
}

export default App;
