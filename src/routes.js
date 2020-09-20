import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home'
import Course from './pages/Course'
import Data from './pages/Data'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/cursos/:idFaculdade/:nomeFaculdade" component={Course}></Route>
        <Route path="/dados/:idFaculdade/:nomeFaculdade/:idCurso/:nomeCurso" component={Data}></Route>
      </Switch>
    </BrowserRouter>
  );
}