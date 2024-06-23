import { Routes, Route } from 'react-router-dom'

import injectContext from './store/injectContext'
import Home from './pages/Home'

function Application() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='home' element={<Home />} />
    </Routes>
  );
}

const App = injectContext(Application);

export default App;
