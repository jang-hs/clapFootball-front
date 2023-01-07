// HOOKS
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MatchContextAPI from "./contextAPI/MatchContext";
import Detail from "./routes/Detail";
import Home from "./routes/Home";
import Join from "./routes/Join";
import Login from "./routes/Login";
function App() {
  const { MatchContext, value, state } = MatchContextAPI()
  return (
    <BrowserRouter>
      <MatchContext.Provider value={value}>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/join" element={<Join />} />
          <Route path="/match/:id" element={<Detail/>} />
          <Route path="/" element={<Home state={state}/>} />
        </Routes>
      </MatchContext.Provider>
    </BrowserRouter>
  );
}

// CLASS
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import DetailClass from "./routes/DetailClass";
// import HomeClass from "./routes/HomeClass";
// import Login from "./routes/Login";
// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/match/:id" element={<DetailClass />} />
//         <Route path="/" element={<HomeClass />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

export default App;
