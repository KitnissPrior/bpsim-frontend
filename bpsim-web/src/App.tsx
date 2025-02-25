// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import { useNavigate } from 'react-router-dom'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WorkFieldScreen from './screens/WorkField';
import StartScreen from './screens/Start';
import { urls } from './navigation/app.urls';
import Layout from './shared/Layout';
import { useEffect } from 'react';


const App: React.FC = () => {

  useEffect(() => {
    if (location.pathname == "/") {
      location.replace(urls.start);
    }
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path={urls.start} element={<StartScreen />} />
          <Route path={urls.workField} element={<WorkFieldScreen />} />
        </Route>
      </Routes>
    </BrowserRouter >
  );
};

export default App;
