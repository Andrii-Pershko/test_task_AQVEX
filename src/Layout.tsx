import { NavLink, Outlet } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import Logo from './assets/images/home/logo.svg?react';
import { Container } from './components/Container/Container';

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <header>
        <Container>
          <div className="h-[112px] flex items-center">
            <Logo />
          </div>
        </Container>
      </header>

      <Container className="flex-1" >
        <Outlet />
      </Container>

      <Footer />
    </div>
  );
};

export default Layout;

