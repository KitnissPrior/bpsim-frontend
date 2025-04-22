import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WorkFieldScreen from './screens/WorkField';
import StartScreen from './screens/Start';
import { urls } from './navigation/app.urls';
import Layout from './shared/components/Layout';
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
          <Route path={urls.subjectAreaCreate} element={<WorkFieldScreen isCreateSubAreaModal={true} />} />
          <Route path={urls.subjectAreaOpen} element={<WorkFieldScreen isOpenSubAreaModal={true} />} />
        </Route>
      </Routes>
    </BrowserRouter >
  );
};

export default App;
