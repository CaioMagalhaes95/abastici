import React from 'react';
import ItemAbastecimento from './ItemAbastecimento';
import './ListaAbastecimentos.css';

function ListaAbastecimentos({ abastecimentos, onDeletar }) {
  if (abastecimentos.length === 0) {
    return (
      <div className="lista-vazia">
        <p>Nenhum abastecimento registrado ainda.</p>
        <p className="hint">Preencha o formulário para adicionar um novo registro.</p>
      </div>
    );
  }

  // Calcular totais
  const totalGasto = abastecimentos.reduce((sum, ab) => sum + parseFloat(ab.valor), 0);
  const totalLitros = abastecimentos
    .filter(ab => ab.litros)
    .reduce((sum, ab) => sum + parseFloat(ab.litros), 0);

  return (
    <div className="lista-abastecimentos">
      <h2>Histórico de Abastecimentos</h2>

      <div className="resumo">
        <div className="card-resumo">
          <span className="label">Total Gasto</span>
          <span className="valor">R$ {totalGasto.toFixed(2)}</span>
        </div>
        <div className="card-resumo">
          <span className="label">Total de Litros</span>
          <span className="valor">{totalLitros.toFixed(2)} L</span>
        </div>
        <div className="card-resumo">
          <span className="label">Registros</span>
          <span className="valor">{abastecimentos.length}</span>
        </div>
      </div>

      <div className="tabela-container">
        <table className="tabela">
          <thead>
            <tr>
              <th>Data</th>
              <th>Combustível</th>
              <th>Valor (R$)</th>
              <th>Litros</th>
              <th>Observações</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {abastecimentos.map(ab => (
              <ItemAbastecimento
                key={ab._id}
                abastecimento={ab}
                onDeletar={onDeletar}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListaAbastecimentos;
