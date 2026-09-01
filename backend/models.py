from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import uuid

db = SQLAlchemy()

class Abastecimento(db.Model):
    """Modelo de Abastecimento"""
    __tablename__ = 'abastecimentos'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    data = db.Column(db.DateTime, nullable=False, default=datetime.now)
    combustivel = db.Column(
        db.Enum('Gasolina', 'Diesel', 'Etanol', 'GNV', name='combustivel_enum'),
        nullable=False
    )
    valor = db.Column(db.DECIMAL(10, 2), nullable=False)
    litros = db.Column(db.DECIMAL(10, 2), nullable=True)
    observacoes = db.Column(db.Text, default='')
    criadoEm = db.Column(db.DateTime, nullable=False, default=datetime.now)
    
    def to_dict(self):
        """Converter objeto para dicionário"""
        return {
            'id': self.id,
            'data': self.data.isoformat(),
            'combustivel': self.combustivel,
            'valor': str(self.valor),
            'litros': str(self.litros) if self.litros else None,
            'observacoes': self.observacoes,
            'criadoEm': self.criadoEm.isoformat()
        }
