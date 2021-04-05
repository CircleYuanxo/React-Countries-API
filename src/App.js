import React, { useState, useEffect } from 'react';
import './styles/App.scss';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import Detailpage from './pages/Detailpage';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { getAll } from './WebAPI'

function App() {

  const [ countries, setCountries ] = useState('')
  const [ color, setColor ] = useState({
    element: 'hsl(0, 0%, 100%)',
    color: 'hsl(200, 15%, 8%)',
    colorInput: 'hsl(0, 0%, 52%)',
    background: 'hsl(0, 0%, 98%)',
  })

  useEffect(()=> {
    getAll().then((res) => {
      setCountries(res)
    })
    document.body.style.backgroundColor = color.background;
  }, [color])

  const handleThemeChange = (isDark) => {
    console.log(isDark)
    if (isDark) {
      setColor({
        element: 'hsl(209, 23%, 22%)',
        background: 'hsl(207, 26%, 17%)',
        color: 'hsl(0, 0%, 100%)',
        colorInput: 'hsl(0, 0%, 100%)',
      })
    } else {
      setColor({
        element: 'hsl(0, 0%, 100%)',
        color: 'hsl(200, 15%, 8%)',
        colorInput: 'hsl(0, 0%, 52%)',
        background: 'hsl(0, 0%, 98%)',
      })
    }
  }


  return (
    <Router>
        <Header handleThemeChange={handleThemeChange} color={color}/>
        <Switch>
          <Route exact path="/">
            <Homepage countries={countries} color={color}/>
          </Route>
          <Route exact path="/:alphaCode">
            <Detailpage countries={countries} color={color}/>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
