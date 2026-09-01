import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import FormAbastecimento from './components/FormAbastecimento';
import ListaAbastecimentos from './components/ListaAbastecimentos';

function App() {
  const [abastecimentos, setAbastecimentos] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const API_URL = 'http://localhost:5000/api';

  // Carregar abastecimentos ao montar o componente
  useEffect(() => {
    carregarAbastecimentos();
  }, []);

  const carregarAbastecimentos = async () => {
    try {
      setCarregando(true);
      const response = await axios.get(`${API_URL}/abastecimentos`);
      setAbastecimentos(response.data);
      setErro(null);
    } catch (error) {
      setErro('Erro ao carregar abastecimentos');
      console.error(error);
    } finally {
      setCarregando(false);
    }
  };

  const adicionarAbastecimento = async (novoAbastecimento) => {
    try {
      const response = await axios.post(
        `${API_URL}/abastecimentos`,
        novoAbastecimento
      );
      setAbastecimentos([response.data, ...abastecimentos]);
      setErro(null);
    } catch (error) {
      setErro('Erro ao adicionar abastecimento');
      console.error(error);
    }
  };

  const deletarAbastecimento = async (id) => {
    try {
      await axios.delete(`${API_URL}/abastecimentos/${id}`);
      setAbastecimentos(abastecimentos.filter(ab => ab.id !== id));
      setErro(null);
    } catch (error) {
      setErro('Erro ao deletar abastecimento');
      console.error(error);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>⛽ Registrador de Abastecimentos</h1>
        <p>Controle seus abastecimentos de forma fácil</p>
      </header>

      <div className="container">
        <div className="formulario-section">
          <FormAbastecimento onSubmit={adicionarAbastecimento} />
        </div>

        {erro && <div className="mensagem-erro">{erro}</div>}

        <div className="lista-section">
          {carregando ? (
            <p className="carregando">Carregando...</p>
          ) : (
            <ListaAbastecimentos
              abastecimentos={abastecimentos}
              onDeletar={deletarAbastecimento}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
