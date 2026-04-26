import { useState, useEffect } from "react";
import "./App.css";

const API_BASE = "https://location-selector.labs.crio.do";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/countries`)
      .then((r) => r.json())
      .then((data) => setCountries(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedCountry) {
      setStates([]);
      setCities([]);
      setSelectedState("");
      setSelectedCity("");
      return;
    }
    setStates([]);
    setCities([]);
    setSelectedState("");
    setSelectedCity("");
    fetch(`${API_BASE}/country=${selectedCountry}/states`)
      .then((r) => r.json())
      .then((data) => setStates(data))
      .catch(console.error);
  }, [selectedCountry]);

  useEffect(() => {
    if (!selectedState) {
      setCities([]);
      setSelectedCity("");
      return;
    }
    setCities([]);
    setSelectedCity("");
    fetch(`${API_BASE}/country=${selectedCountry}/state=${selectedState}/cities`)
      .then((r) => r.json())
      .then((data) => setCities(data))
      .catch(console.error);
  }, [selectedState, selectedCountry]);

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Select Location</h2>

        <div className="dropdowns">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option key="select-country" value="">Select Country</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            disabled={!selectedCountry}
          >
            <option key="select-state" value="">Select State</option>
            {states.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!selectedState}
          >
            <option key="select-city" value="">Select City</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {selectedCity && selectedState && selectedCountry && (
          <p className="result">
            You selected <strong>{selectedCity}</strong>, {selectedState}, {selectedCountry}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;