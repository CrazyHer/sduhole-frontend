import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
import { ConfigProvider } from 'antd';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './reducers/configureStore';
import zhCN from 'antd/es/locale/zh_CN';

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <Router>
        <App />
      </Router>
    </ConfigProvider>
  </Provider>,
  document.getElementById('root')
);
