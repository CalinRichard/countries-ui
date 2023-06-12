import { Route, Routes } from "react-router-dom";
import CountryDetails from "./CountryDetails";
import CountryList from "./CountryList";

function App() {

  
  return (
    <Routes>
      <Route path="/countries" element={<CountryList />}/>
      <Route path="/countries/:id" element={<CountryDetails />} />
    </Routes>
    
  );
}

export default App;
