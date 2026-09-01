import React, { useState } from 'react';
import './ItemAbastecimento.css';

function ItemAbastecimento({ abastecimento, onDeletar }) {
  const [deletando, setDeletando] = useState(false);

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDeletar = async () => {
    if (window.confirm('Tem certeza que deseja deletar este abastecimento?')) {
      try {
        setDeletando(true);
        await onDeletar(abastecimento.id);
      } finally {
        setDeletando(false);
      }
    }
  };

  const obterEmoji = (combustivel) => {
    const emojis = {
      'Gasolina': '🔴',
      'Diesel': '⚫',
      'Etanol': '🟢',
      'GNV': '🔵'
    };
    return emojis[combustivel] || '⛽';
  };

  return (
    <tr className="item-abastecimento">
      <td>{formatarData(abastecimento.data)}</td>
      <td>
        <span className="combustivel-badge">
          {obterEmoji(abastecimento.combustivel)} {abastecimento.combustivel}
        </span>
      </td>
      <td className="valor-coluna">R$ {parseFloat(abastecimento.valor).toFixed(2)}</td>
      <td>{abastecimento.litros ? `${parseFloat(abastecimento.litros).toFixed(2)} L` : '-'}</td>
      <td className="observacoes-coluna">{abastecimento.observacoes || '-'}</td>
      <td className="acao-coluna">
        <button
          className="btn-deletar"
          onClick={handleDeletar}
          disabled={deletando}
          title="Deletar abastecimento"
        >
          {deletando ? '...' : '🗑️'}
        </button>
      </td>
    </tr>
  );
}

export default ItemAbastecimento;
