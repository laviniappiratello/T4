import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { listarClientes, Cliente } from "../services/clientServices";

const ListaCliente = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    async function fetchClientes() {
      const data = await listarClientes();
      setClientes(data);
    }
    fetchClientes();
  }, []);

  return (
    <div
      className="container mt-5 p-4 rounded-4 shadow"
      style={{
        backgroundColor: "#fff0f5",
        border: "1px solid #f8a5c2",
        fontFamily: "'Quicksand', sans-serif",
        color: "#000",
      }}
    >
      <h2
        className="mb-4"
        style={{
          fontFamily: "'Dancing Script', cursive",
          color: "#d16ba5",
        }}
      >
        🌸 Lista de Clientes
      </h2>

      <ul className="list-group list-group-flush">
        {clientes.map((cliente, index) => (
          <li
            key={index}
            className="list-group-item mb-3 rounded-4 p-3"
            style={{
              backgroundColor: "#ffe4ec",
              border: "1px solid #f8a5c2",
              boxShadow: "0 0 8px #f3c5d8",
            }}
          >
            <h5 style={{ color: "#c44569" }}>
              {cliente.nome} {cliente.sobrenome} 💖
            </h5>

            <p>
              <strong>🏡 Endereço:</strong> {cliente.endereco?.rua},{" "}
              {cliente.endereco?.numero}, {cliente.endereco?.bairro},{" "}
              {cliente.endereco?.cidade} - {cliente.endereco?.estado} - CEP:{" "}
              {cliente.endereco?.codigoPostal}
            </p>

            {cliente.endereco?.informacoesAdicionais && (
              <p>
                <strong>📌 Info adicional:</strong>{" "}
                {cliente.endereco?.informacoesAdicionais}
              </p>
            )}

            <p>
              <strong>📞 Telefones:</strong>{" "}
              {cliente.telefones
                .map((tel) => `(${tel.ddd}) ${tel.numero}`)
                .join(", ")}
            </p>

            <div className="mt-3">
              <Link
                to={`/cadastroClientes/${cliente.id}`}
                className="btn btn-sm"
                style={{
                  backgroundColor: "#f8a5c2",
                  color: "#fff",
                  fontWeight: "bold",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                ✏️ Editar
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaCliente;
