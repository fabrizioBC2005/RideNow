import { Link } from "react-router-dom";

export default function ConduceMenu() {
  return (
    <div className="conduce-menu">
      <h2 className="conduce-title">Conduce</h2>

      <nav className="conduce-links">
        <Link to="/conduce/registrate">Registrate</Link>
        <Link to="/conduce/requisitos">Requisitos</Link>
        <Link to="/conduce/ganancias">Ganancias</Link>
        <Link to="/conduce/primer-viaje">Tu primer viaje</Link>
        <Link to="/conduce/seguridad">Seguridad</Link>
        <Link to="/conduce/contactanos">Contáctanos</Link>
      </nav>
    </div>
  );
}