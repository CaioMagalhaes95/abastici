import React, { useState } from 'react';
import './FormAbastecimento.css';

function FormAbastecimento({ onSubmit }) {
  const [formData, setFormData] = useState({
    combustivel: 'Gasolina',
    valor: '',
    litros: '',
    observacoes: ''
  });

  const [enviando, setEnviando] = useState(false);

  const combustiveis = ['Gasolina', 'Diesel', 'Etanol', 'GNV'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.valor) {
      alert('Por favor, preencha o valor');
      return;
    }

    try {
      setEnviando(true);
      await onSubmit({
        combustivel: formData.combustivel,
        valor: parseFloat(formData.valor),
        litros: formData.litros ? parseFloat(formData.litros) : null,
        observacoes: formData.observacoes
      });

      // Limpar formulário
      setFormData({
        combustivel: 'Gasolina',
        valor: '',
        litros: '',
        observacoes: ''
      });

      alert('Abastecimento registrado com sucesso!');
    } catch (error) {
      alert('Erro ao registrar abastecimento');
      console.error(error);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form className="form-abastecimento" onSubmit={handleSubmit}>
      <h2>Novo Abastecimento</h2>

      <div className="form-group">
        <label htmlFor="combustivel">Tipo de Combustível *</label>
        <select
          id="combustivel"
          name="combustivel"
          value={formData.combustivel}
          onChange={handleChange}
          required
        >
          {combustiveis.map(comb => (
            <option key={comb} value={comb}>
              {comb}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="valor">Valor (R$) *</label>
        <input
          id="valor"
          type="number"
          name="valor"
          value={formData.valor}
          onChange={handleChange}
          placeholder="Ex: 150.50"
          step="0.01"
          min="0"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="litros">Litros (opcional)</label>
        <input
          id="litros"
          type="number"
          name="litros"
          value={formData.litros}
          onChange={handleChange}
          placeholder="Ex: 45.5"
          step="0.01"
          min="0"
        />
      </div>

      <div className="form-group">
        <label htmlFor="observacoes">Observações</label>
        <textarea
          id="observacoes"
          name="observacoes"
          value={formData.observacoes}
          onChange={handleChange}
          placeholder="Ex: Abasteci no posto X"
          rows="3"
        ></textarea>
      </div>

      <button type="submit" disabled={enviando} className="btn-submit">
        {enviando ? 'Registrando...' : 'Registrar Abastecimento'}
      </button>
    </form>
  );
}

export default FormAbastecimento;
