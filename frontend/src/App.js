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



function App() {


  return (

    <Router>
      <div className="App">
        <Navbar />
        <div className="App-content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route exact path="/products/:id">
              <ProductDetails />
            </Route>
            <Route path="/products/update/:id">
              <Update />
            </Route>
            <Route path="/live">
              <Live />
            </Route>
            <Route path="*">
              <Nopage />
            </Route>

          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
