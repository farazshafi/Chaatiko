import './App.css';
import { Route, Routes } from "react-router-dom"
import HomePage from './Pages/HomePage';
import ChatsPage from './Pages/ChatsPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/chats' element={<ChatsPage />} />
      </Routes>
    </div>
  );
}

export default App;
