import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VisitCardPage from './Pages/VisitCardPage';
import CreateCardPage from './Pages/CreateCardPage';
import UpdateCardPage from './Pages/UpdateCardPage';
import DetailsPage from './Pages/DetailsPage';

function App() {
  return (
    <Router>
    <div>
      <h1>Visit Card Management</h1>
      <Routes>
        <Route path="/" element={<VisitCardPage />} />
        <Route path="/create" element={<CreateCardPage />} />
        <Route path="/update/:id" element={<UpdateCardPage />} /> 
        <Route path="/details/:id" element={<DetailsPage />} /> 
        </Routes>
    </div>
  </Router>);
}

export default App;
