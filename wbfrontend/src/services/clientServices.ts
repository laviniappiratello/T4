const API_BASE_URL = "http://localhost:32832";

export interface Endereco {
    cidade: string;
    estado: string;
    bairro: string;
    rua: string;
    numero: string;
    codigoPostal: string;
    informacoesAdicionais: string;
}

export interface Telefone {
    ddd: string;
    numero: string;
}

export interface Cliente {
    id?: number;
    nome: string;
    sobrenome: string;
    endereco: Endereco;
    telefones: Telefone[];
    cidade: string;  // Adicionado
    idade: number;  // Adicionado
    cpf: string;    // Adicionado
}



// GET /clientes
export const listarClientes = async (): Promise<Cliente[]> => {
    const response = await fetch(`${API_BASE_URL}/clientes`);
    return response.json();
};

// GET /cliente/{id}
export const obterCliente = async (id: number): Promise<Cliente> => {
    const response = await fetch(`${API_BASE_URL}/cliente/${id}`);
    return response.json();
};

// POST /cliente/cadastrar
export const cadastrarCliente = async (cliente: Cliente): Promise<void> => {
    await fetch(`${API_BASE_URL}/cliente/cadastrar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente),
    });
};

// PUT /cliente/atualizar
export const atualizarCliente = async (cliente: Cliente): Promise<void> => {
    await fetch(`${API_BASE_URL}/cliente/atualizar`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente),
    });
};

// DELETE /cliente/excluir
export const excluirCliente = async (cliente: Cliente): Promise<void> => {
    await fetch(`${API_BASE_URL}/cliente/excluir`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente),
    });
};

