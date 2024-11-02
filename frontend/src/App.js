import React,{ useEffect }  from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ResultPage from './components/ResultPage';
import './App.scss'; // Custom styles
import FaceSwapForm from './components/FaceSwapForm';
import Gallery from './components/Gallery/Gallery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import Home from './components/Home';
import ObjectRemoval from './components/ObjectRemoval/ObjectRemoval';
import Navigation from './components/Navigation/Navigation';
import { analytics } from './firebase'; // Import Firebase analytics

function App() {
  useEffect(() => {
    if (analytics) {
      console.log("Firebase Analytics initialized.");
    }
  }, []);
  return (
    <Router>
      <div className="App">
      <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery/:category" element={<Gallery />} />
          <Route path="/form" element={<FaceSwapForm />} />
          <Route path="/form/:categorySlug" element={<FaceSwapForm />} />
          <Route path="/form/object_removal" element={<ObjectRemoval />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
