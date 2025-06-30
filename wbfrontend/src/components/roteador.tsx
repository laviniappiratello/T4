
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BarraNavegacao from "./navbar";
import FormClientes from "./cadastroClientes";
import ListaCliente from "./listaClientes";


const Roteador = () => {
    return (
        <Router>
            <BarraNavegacao />
            <Routes>
                <Route path="/" element={<h1 className="text-center mt-5">Gerência World Beauty</h1>} />
                <Route path="/clientes" element={<ListaCliente />} />
                <Route path="/cadastroClientes" element={<FormClientes />} />
                <Route path="/cadastroClientes/:id" element={<FormClientes />} />

            </Routes>
        </Router>
    );
};

export default Roteador;
