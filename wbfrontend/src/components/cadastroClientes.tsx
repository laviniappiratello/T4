import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BASE_API = "http://localhost:32832";

interface Telefone {
  ddd: string;
  numero: string;
}

interface Endereco {
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  codigoPostal: string;
  complemento?: string;
}

interface Cliente {
  nome: string;
  sobrenome: string;
  email: string;
  idade: number;
  cpf: string;
  endereco: Endereco;
  telefones: Telefone[];
}

const FormularioCliente = () => {
  const { id } = useParams<{ id: string }>();
  const navega = useNavigate();

  const estadoInicial: Cliente = {
    nome: "",
    sobrenome: "",
    email: "",
    idade: 0,
    cpf: "",
    endereco: {
      estado: "",
      cidade: "",
      bairro: "",
      rua: "",
      numero: "",
      codigoPostal: "",
      complemento: "",
    },
    telefones: [{ ddd: "", numero: "" }],
  };

  const [cliente, setCliente] = useState<Cliente>(estadoInicial);

  useEffect(() => {
    if (!id) return;

    async function buscarCliente() {
      try {
        const res = await fetch(`${BASE_API}/cliente/${id}`, {
          headers: { "Content-Type": "application/json" },
        });
        const dados = await res.json();

        setCliente({
          nome: dados.nome ?? "",
          sobrenome: dados.sobreNome ?? "",
          email: dados.email ?? "",
          idade: dados.idade ?? 0,
          cpf: dados.cpf ?? "",
          endereco: dados.endereco ?? estadoInicial.endereco,
          telefones:
            dados.telefones?.length > 0
              ? dados.telefones.map((t: any) => ({
                  ddd: t.ddd,
                  numero: t.numero,
                }))
              : [{ ddd: "", numero: "" }],
        });
      } catch (err) {
        console.error(err);
      }
    }

    buscarCliente();
  }, [id]);

  function atualizaCampo(
    e: React.ChangeEvent<HTMLInputElement>,
    campo?: keyof Endereco,
    telIndex?: number,
    telCampo?: keyof Telefone
  ) {
    const valor = e.target.value;

    if (campo) {
      setCliente((prev) => ({
        ...prev,
        endereco: { ...prev.endereco, [campo]: valor },
      }));
    } else if (typeof telIndex === "number" && telCampo) {
      const telefonesNovos = [...cliente.telefones];
      telefonesNovos[telIndex] = {
        ...telefonesNovos[telIndex],
        [telCampo]: valor,
      };
      setCliente((prev) => ({ ...prev, telefones: telefonesNovos }));
    } else {
      setCliente((prev) => ({ ...prev, [e.target.name]: valor }));
    }
  }

  function adicionaTelefone() {
    setCliente((prev) => ({
      ...prev,
      telefones: [...prev.telefones, { ddd: "", numero: "" }],
    }));
  }

  async function enviaForm(e: React.FormEvent) {
    e.preventDefault();

    const metodo = id ? "PUT" : "POST";
    const rota = id ? "cliente/atualizar" : "cliente/cadastrar";

    const dadosEnviar = { ...cliente, sobreNome: cliente.sobrenome };
    delete (dadosEnviar as any).sobrenome;

    try {
      const res = await fetch(`${BASE_API}/${rota}`, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosEnviar),
      });
      if (!res.ok) throw new Error("Erro na requisição");

      alert(id ? "Cliente atualizado com sucesso!" : "Cliente cadastrado!");
      navega("/clientes");
    } catch (erro) {
      console.error(erro);
    }
  }

  return (
    <main
      className="container p-4 rounded-3 my-4 shadow"
      style={{
        backgroundColor: "#fff0f5",
        color: "#000",
        border: "1px solid #f8a5c2",
        fontFamily: "'Quicksand', sans-serif",
      }}
    >
      <h2 style={{ fontFamily: "'Dancing Script', cursive", color: "#d16ba5" }}>
        {id ? "Editar Cliente ✍️" : "Cadastrar Cliente 💖"}
      </h2>

      <form onSubmit={enviaForm} className="d-flex flex-column gap-3">
        {/* Campos principais */}
        {[
          { name: "nome", label: "Nome" },
          { name: "sobrenome", label: "Sobrenome" },
          { name: "email", label: "Email", type: "email" },
          { name: "idade", label: "Idade", type: "number" },
          { name: "cpf", label: "CPF", maxLength: 11 },
        ].map(({ name, label, type = "text", maxLength }) => (
          <input
            key={name}
            type={type}
            name={name}
            placeholder={label}
            value={(cliente as any)[name]}
            onChange={atualizaCampo}
            required
            maxLength={maxLength}
            className="form-control"
            style={{
              backgroundColor: "#fff",
              color: "#000",
              border: "1px solid #f8a5c2",
              borderRadius: "10px",
            }}
          />
        ))}

        {/* Endereço */}
        <fieldset
          className="p-3 rounded"
          style={{ border: "1px solid #f8a5c2", backgroundColor: "#fff0f5" }}
        >
          <legend style={{ color: "#d16ba5", fontWeight: "bold" }}>
            Endereço
          </legend>
          {[
            "rua",
            "bairro",
            "cidade",
            "estado",
            "numero",
            "codigoPostal",
            "complemento",
          ].map((campo) => (
            <input
              key={campo}
              type="text"
              placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
              value={(cliente.endereco as any)[campo]}
              onChange={(e) => atualizaCampo(e, campo as keyof Endereco)}
              required={campo !== "complemento"}
              className="form-control mb-2"
              style={{
                backgroundColor: "#fff",
                color: "#000",
                border: "1px solid #f8a5c2",
                borderRadius: "10px",
              }}
            />
          ))}
        </fieldset>

        {/* Telefones */}
        <fieldset
          className="p-3 rounded"
          style={{ border: "1px solid #f8a5c2", backgroundColor: "#fff0f5" }}
        >
          <legend style={{ color: "#d16ba5", fontWeight: "bold" }}>
            Telefones
          </legend>
          {cliente.telefones.map((tel, i) => (
            <div key={i} className="d-flex gap-3 mb-2">
              <input
                type="text"
                maxLength={2}
                placeholder="DDD"
                value={tel.ddd}
                onChange={(e) => atualizaCampo(e, undefined, i, "ddd")}
                required
                className="form-control"
                style={{
                  backgroundColor: "#fff",
                  color: "#000",
                  border: "1px solid #f8a5c2",
                  borderRadius: "10px",
                }}
              />
              <input
                type="text"
                maxLength={9}
                placeholder="Número"
                value={tel.numero}
                onChange={(e) => atualizaCampo(e, undefined, i, "numero")}
                required
                className="form-control"
                style={{
                  backgroundColor: "#fff",
                  color: "#000",
                  border: "1px solid #f8a5c2",
                  borderRadius: "10px",
                }}
              />
            </div>
          ))}

          <button
            type="button"
            onClick={adicionaTelefone}
            className="btn mt-2"
            style={{
              backgroundColor: "#ffd6e8",
              color: "#d16ba5",
              border: "1px solid #f8a5c2",
              borderRadius: "10px",
            }}
          >
            + Adicionar Telefone 📞
          </button>
        </fieldset>

        {/* Botão final */}
        <button
          type="submit"
          className="btn fw-bold mt-3"
          style={{
            backgroundColor: "#f8a5c2",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
          }}
        >
          {id ? "Salvar ✨" : "Cadastrar 💌"}
        </button>
      </form>
    </main>
  );
};

export default FormularioCliente;
