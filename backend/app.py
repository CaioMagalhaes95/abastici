from flask import Flask, request, jsonify
from flask_cors import CORS
from config import config
from models import db, Abastecimento
from datetime import datetime
import os

def create_app(config_name='development'):
    """Factory para criar aplicação Flask"""
    app = Flask(__name__)
    
    # Carregar configuração
    app.config.from_object(config[config_name])
    
    # Inicializar extensões
    db.init_app(app)
    CORS(app)
    
    # Criar contexto da aplicação
    with app.app_context():
        db.create_all()
    
    # ===== ROTAS =====
    
    # Health check
    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({'status': 'API funcionando'}), 200
    
    # GET - Listar todos os abastecimentos
    @app.route('/api/abastecimentos', methods=['GET'])
    def listar_abastecimentos():
        try:
            abastecimentos = Abastecimento.query.order_by(Abastecimento.criadoEm.desc()).all()
            return jsonify([ab.to_dict() for ab in abastecimentos]), 200
        except Exception as e:
            return jsonify({'erro': str(e)}), 500
    
    # POST - Criar novo abastecimento
    @app.route('/api/abastecimentos', methods=['POST'])
    def criar_abastecimento():
        try:
            dados = request.get_json()
            
            # Validar dados obrigatórios
            if not dados or not dados.get('combustivel') or not dados.get('valor'):
                return jsonify({'erro': 'Combustível e valor são obrigatórios'}), 400
            
            # Criar novo abastecimento
            novo_abastecimento = Abastecimento(
                combustivel=dados['combustivel'],
                valor=float(dados['valor']),
                litros=float(dados['litros']) if dados.get('litros') else None,
                observacoes=dados.get('observacoes', ''),
                data=datetime.now()
            )
            
            db.session.add(novo_abastecimento)
            db.session.commit()
            
            return jsonify(novo_abastecimento.to_dict()), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'erro': str(e)}), 500
    
    # GET - Obter um abastecimento por ID
    @app.route('/api/abastecimentos/<id>', methods=['GET'])
    def obter_abastecimento(id):
        try:
            abastecimento = Abastecimento.query.get(id)
            if not abastecimento:
                return jsonify({'erro': 'Abastecimento não encontrado'}), 404
            return jsonify(abastecimento.to_dict()), 200
        except Exception as e:
            return jsonify({'erro': str(e)}), 500
    
    # PUT - Atualizar um abastecimento
    @app.route('/api/abastecimentos/<id>', methods=['PUT'])
    def atualizar_abastecimento(id):
        try:
            abastecimento = Abastecimento.query.get(id)
            if not abastecimento:
                return jsonify({'erro': 'Abastecimento não encontrado'}), 404
            
            dados = request.get_json()
            
            if 'combustivel' in dados:
                abastecimento.combustivel = dados['combustivel']
            if 'valor' in dados:
                abastecimento.valor = float(dados['valor'])
            if 'litros' in dados:
                abastecimento.litros = float(dados['litros']) if dados['litros'] else None
            if 'observacoes' in dados:
                abastecimento.observacoes = dados['observacoes']
            
            db.session.commit()
            return jsonify(abastecimento.to_dict()), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'erro': str(e)}), 500
    
    # DELETE - Deletar um abastecimento
    @app.route('/api/abastecimentos/<id>', methods=['DELETE'])
    def deletar_abastecimento(id):
        try:
            abastecimento = Abastecimento.query.get(id)
            if not abastecimento:
                return jsonify({'erro': 'Abastecimento não encontrado'}), 404
            
            db.session.delete(abastecimento)
            db.session.commit()
            
            return jsonify({'mensagem': 'Abastecimento deletado com sucesso'}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'erro': str(e)}), 500
    
    # ===== TRATAMENTO DE ERROS =====
    
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'erro': 'Rota não encontrada'}), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({'erro': 'Erro interno do servidor'}), 500
    
    return app

if __name__ == '__main__':
    app = create_app(os.getenv('FLASK_ENV', 'development'))
    app.run(debug=True, host='0.0.0.0', port=5000)
