import React, { useContext, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Uri from '../assets/utils/uri';
import Context from '../core/context/Store';
import Dashboard from './dashboard';
// import TraffleSystem from './traffle/TraffleSystem';
import Customer from './user/customer/Customer';
import Sidebar from '../components/navigation/Sidebar';
import { routes } from './config';
import Navbar from '../components/navigation/Navbar';

export const getInitialRoutePage = (user) => {
  return user?.is_admin && user?.username === 'AppAdmin001'
  ? Uri.dashboard : Uri.SystemTraffles;
}

export const isSuperAdmin = (user) => {
  return user?.is_admin && user?.username === 'AppAdmin001';
}


const App = (props) => {
  const { msgs, user } = useContext(Context).state;
  // const defaultRoute = getInitialRoutePage(user);  
  const fullAccess = isSuperAdmin(user);
  
  const renderedRoutes = routes.map( AppRoute => AppRoute.access === 2 || (AppRoute.access === 1 && fullAccess) ? (
    <Route key={AppRoute.link} path={AppRoute.link}>
      <AppRoute.Component user={user} NavigationBar={AppRoute.NavigationBar}  />
    </Route>
  ): null)

  return (
    <Router>
      <Fragment>
        <Sidebar msgs={msgs} user={user} />
        <Switch>
          <Route exact path='/'>
            {fullAccess ? <Dashboard {...props}/> : <Customer NavigationBar={Navbar} {...props}/>}
          </Route>
          {renderedRoutes}
          <Route>
            <Redirect exact from='*' path={Uri.Customer} />
          </Route>
        </Switch>
      </Fragment>
    </Router>
  );
}
  
  export default App;
  