import { Link, Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <div>
      <header className="header">
        <h4 className="header__logo">K8s</h4>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/greet/Rishabh">Greet</Link>
          <Link to="/todos">Todos</Link>
        </nav>
      </header>
      <h1>🙏</h1>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
