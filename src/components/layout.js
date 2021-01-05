import { Button, Dropdown, Layout, Menu } from 'antd';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo-light.png';
import './layout.css';
import { onLogoff } from '../pages/login/login_redux';

const _Layout = ({ children }) => {
  let location = useLocation().pathname;
  let { userName } = useSelector((state) => state.user);

  const menu = (
    <Menu>
      <Menu.Item>
        <Button onClick={onLogoff} type="text">
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
          {userName && (
            <Dropdown overlay={menu}>
              <Link
                to="/home"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <h3>{userName}</h3>
              </Link>
            </Dropdown>
          )}
        </Layout.Header>
        <Layout.Content className="content">{children}</Layout.Content>
      </Layout>
    );
};
export default _Layout;
