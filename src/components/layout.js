import { Button, Dropdown, Layout, Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo-light.png';
import { onLogoff } from '../pages/login/login_redux';
import './layout.css';

const _Layout = ({ children }) => {
  let location = useLocation().pathname;
  let { stoken } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logoff = () => {
    onLogoff(dispatch);
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <Button onClick={logoff} type="text">
          退出登录
        </Button>
      </Menu.Item>
    </Menu>
  );

  if (location === '/login' || location === '/register') {
    return children;
  } else
    return (
      <Layout>
        <Layout.Header className="header">
          <div>
            <Link to="/home">
              <img src={logo} alt="山东大学LOGO" width="214px" height="64px" />
              <h1>山大树洞</h1>
            </Link>
          </div>
          <Dropdown overlay={menu}>
            <Link to="/home" style={{ display: 'flex', alignItems: 'center' }}>
              <h3>{stoken ? '匿名' : '无权限'}</h3>
            </Link>
          </Dropdown>
        </Layout.Header>
        <Layout.Content className="content">{children}</Layout.Content>
      </Layout>
    );
};
export default _Layout;
