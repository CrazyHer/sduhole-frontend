import { Spin } from 'antd';
import axios from 'axios';
import { lazy, Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import Layout from './components/layout';

const Login = lazy(() => import('./pages/login/login'));
const Register = lazy(() => import('./pages/register/register'));
const Home = lazy(() => import('./pages/home/home'));
function App() {
  let { token } = useSelector((state) => state.user);
  axios.defaults.headers['token'] = token;

  let location = useLocation().pathname;
  let history = useHistory();
  useEffect(() => {
    //未登录状态访问除登录、注册、管理员登录页面以外的页面，均跳转到登录页面进行登录
    if (location !== '/login' && location !== '/register' && token === '') {
      history.push('/login');
    }
  });

  return (
    <Layout>
      <Suspense
        fallback={
          <Spin spinning={true} style={{ top: '50%', position: 'absolute' }} />
        }
      >
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Redirect from="/" to="/home" />
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
