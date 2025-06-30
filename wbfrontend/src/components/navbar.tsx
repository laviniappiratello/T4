import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


const BarraNavegacao = () => {
  return (
    <header>
      <nav
  className="navbar navbar-expand-lg border-bottom"
  style={{ backgroundColor: '#f9b', borderColor: '#f8a5c2' }}
>
  <div className="container d-flex justify-content-between align-items-center py-2">
    <Link
      to="/"
      className="navbar-brand fw-bold fs-2"
      style={{
        color: '#000000',
        fontFamily: "'Dancing Script', cursive",
      }}
    >
      W♥rld Beauty
    </Link>

    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#menuPrincipal"
      aria-controls="menuPrincipal"
      aria-expanded="false"
      aria-label="Alternar menu"
      style={{ borderColor: '#f8a5c2' }}
    >
      <span
        className="navbar-toggler-icon"
        style={{
          filter:
            'invert(72%) sepia(15%) saturate(562%) hue-rotate(292deg) brightness(95%) contrast(87%)',
        }}
      ></span>
    </button>

    <div className="collapse navbar-collapse justify-content-end" id="menuPrincipal">
      <ul className="navbar-nav gap-4">
        <li className="nav-item">
          <Link
            to="/clientes"
            className="nav-link fw-semibold"
            style={{ color: '#000000' }}
          >
            🌷 Lista de Clientes
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/cadastroClientes"
            className="nav-link fw-semibold"
            style={{ color: '#000000' }}
          >
            ✨ Cadastrar Cliente
          </Link>
        </li>
      </ul>
    </div>
  </div>
</nav>

    </header>
  );
};

export default BarraNavegacao;
