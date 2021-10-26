import { Suspense } from 'react'
import { HashRouter as Router } from 'react-router-dom'
import Routes from './routes';
import NavBar from './components/AppBar';
import Footer from './components/Footer';
import useEagerConnect from './hooks/useEagerConnect';

function App() {
  useEagerConnect()

  return (
    <Router>
      <Suspense fallback={null}>
        <NavBar />
        <Routes />
        <Footer />
      </Suspense>
    </Router>
  )
}

export default App;
