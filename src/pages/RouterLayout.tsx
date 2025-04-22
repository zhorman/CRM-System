import { Outlet, Navigate } from 'react-router';
import MainNavigation from '../components/MainNavigation/MainNavigation';
import { useAppSelector } from '../store/hooks';

import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

function RootLayout() {
  const refreshToken = useAppSelector((state) => state.auth.refreshToken);
  const tokenExpiration = useAppSelector((state) => state.auth.tokenExpiration);
  const isExpiredToken = tokenExpiration && Date.now() > tokenExpiration;

  if (!refreshToken || isExpiredToken) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout
      style={{ minHeight: '100vh', maxWidth: '1200px', margin: '0 auto' }}>
      <Header style={{ backgroundColor: 'inherit', textAlign: 'center' }}>
        Header
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            backgroundColor: 'inherit',
          }}>
          <MainNavigation />
        </Sider>
        <Content style={{ flexGrow: 1, padding: '1rem' }}>
          <Outlet />
        </Content>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>Footer</Footer>
    </Layout>
  );
}

export default RootLayout;
