import { NavLink, Outlet } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import Logo from './assets/images/home/logo.svg';

const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <span className="text-lg font-semibold tracking-tight text-cyan-400">
            <Logo />
          </span>
          <nav className="flex gap-4 text-sm">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-2 py-1 rounded-md transition-colors ${isActive ? 'bg-cyan-500 text-slate-950' : 'text-slate-300 hover:text-cyan-300'
                }`
              }
            >
              Головна
            </NavLink>
            <NavLink
              to="/product/1"
              className={({ isActive }) =>
                `px-2 py-1 rounded-md transition-colors ${isActive ? 'bg-cyan-500 text-slate-950' : 'text-slate-300 hover:text-cyan-300'
                }`
              }
            >
              Картка товару
            </NavLink>
          </nav>
        </div>
      </header>

      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;

