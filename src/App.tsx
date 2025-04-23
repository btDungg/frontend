import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import SearchScores from './pages/SearchScores';
import FeatureReport from './pages/FeatureReport';
import TopStudentsLayout from './components/TopStudentsLayout';
import TopStudentsA from './components/TopStudentsA';
import TopStudentsB from './components/TopStudentsB';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<FeatureReport />} />
          <Route path="search" element={<SearchScores />} />
          <Route path="reports">
            <Route index element={<Navigate to="group-a" replace />} />
            <Route path=":group" element={<TopStudentsLayout />}>
              <Route path="group-a" element={<TopStudentsA />} />
              <Route path="group-b" element={<TopStudentsB />} />
            </Route>
          </Route>
        </Route>
          
           

      </Routes>
    </BrowserRouter>
  );
}

export default App;
