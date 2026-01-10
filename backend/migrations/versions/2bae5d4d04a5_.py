"""Corrige foreign key de location_id em services para apontar para locations em vez de residents

Revision ID: 2bae5d4d04a5
Revises: 8a554cb5111d
Create Date: 2026-01-10 01:38:49.767155
"""
from alembic import op
import sqlalchemy as sa

# revision identifiers
revision = '2bae5d4d04a5'
down_revision = '8a554cb5111d'
branch_labels = None
depends_on = None


def upgrade():
    # Corrige a foreign key: services.location_id deve apontar para locations.id
    with op.batch_alter_table('services', schema=None) as batch_op:
        batch_op.drop_constraint('services_location_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(
            'services_location_id_fkey',
            'locations',  # tabela alvo correta
            ['location_id'],
            ['id']
        )


def downgrade():
    # Reverte para apontar para residents.id (estado anterior)
    with op.batch_alter_table('services', schema=None) as batch_op:
        batch_op.drop_constraint('services_location_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(
            'services_location_id_fkey',
            'residents',  # volta a apontar para residents (estado incorreto original)
            ['location_id'],
            ['id']
        )