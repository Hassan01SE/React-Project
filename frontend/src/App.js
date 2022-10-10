import './index.css';
import Home from './Home';
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Create from './Create';
import ProductDetails from './ProductDetails';
import Footer from './Footer';
import Update from './Update';
import Nopage from './Nopage';
import Live from './Live';
import Login from './Login';
import Register from './Register';
import { AuthProvider } from './auth';
import RequireAuth from './RequireAuth';



function App() {

  const confirm = false;
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="App-content">
            <Switch>
              <Route exact path="/">
                <Login />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/home">
                <RequireAuth><Home /></RequireAuth>
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/create">
                <RequireAuth><Create /></RequireAuth>
              </Route>
              <Route exact path="/products/:id/:pid">
                <RequireAuth><ProductDetails /></RequireAuth>
              </Route>
              <Route path="/user/:id/products/update/:pid">
                <RequireAuth><Update /></RequireAuth>
              </Route>
              <Route path="/live">
                <RequireAuth><Live /></RequireAuth>
              </Route>
              <Route path="*">
                <Nopage />
              </Route>

            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
