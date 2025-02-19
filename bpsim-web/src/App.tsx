import './App.css'
import { publicApi } from './services/api';
import { useState } from 'react';

type Node = {
  name: string;
  description: string;
}

function App() {
  const [postStatus, setPostStatus] = useState('');
  const onTestNodeCreate = () => {
    const node: Node = {
      name: "Узел1",
      description: "внутри что-то происходит"
    }

    publicApi.post('/node/', node)
      .then(res => {
        console.log("Узел успешно добавлен!", res.data)
        setPostStatus("Узел успешно добавлен!");
      })
      .catch(error => {
        console.error(error.response.data);
        setPostStatus(error.response.message);
      })

  }

  return (
    <>
      <div>
        <h1>Добро пожаловать в BPsim.MAS Web!</h1>
        <h2>Создано ООО "Симулянты"</h2>
      </div>
      <button type="button" onClick={onTestNodeCreate}>Добавить узел</button>
      <div>{postStatus}</div>

    </>
  )
}

export default App
