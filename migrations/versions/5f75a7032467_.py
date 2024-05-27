"""empty message

Revision ID: 5f75a7032467
Revises: 4cc9c03a5ec6
Create Date: 2024-05-27 01:53:50.889352

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5f75a7032467'
down_revision = '4cc9c03a5ec6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('people', schema=None) as batch_op:
        batch_op.alter_column('heigth',
               existing_type=sa.INTEGER(),
               type_=sa.String(length=80),
               existing_nullable=False)
        batch_op.alter_column('mass',
               existing_type=sa.INTEGER(),
               type_=sa.String(length=80),
               existing_nullable=False)

    with op.batch_alter_table('planets', schema=None) as batch_op:
        batch_op.alter_column('rotation_period',
               existing_type=sa.INTEGER(),
               type_=sa.String(length=10),
               existing_nullable=False)
        batch_op.alter_column('orbital_period',
               existing_type=sa.INTEGER(),
               type_=sa.String(length=10),
               existing_nullable=False)
        batch_op.alter_column('diameter',
               existing_type=sa.INTEGER(),
               type_=sa.String(length=10),
               existing_nullable=False)
        batch_op.alter_column('population',
               existing_type=sa.INTEGER(),
               type_=sa.String(length=80),
               existing_nullable=False)

    with op.batch_alter_table('starships', schema=None) as batch_op:
        batch_op.alter_column('manufacturer',
               existing_type=sa.VARCHAR(length=40),
               type_=sa.String(length=80),
               existing_nullable=False)
        batch_op.alter_column('cost_in_credits',
               existing_type=sa.INTEGER(),
               type_=sa.String(length=40),
               existing_nullable=False)
        batch_op.alter_column('length',
               existing_type=sa.INTEGER(),
               type_=sa.String(length=20),
               existing_nullable=False)
        batch_op.alter_column('max_atmosphering_speed',
               existing_type=sa.INTEGER(),
               type_=sa.String(length=20),
               existing_nullable=False)
        batch_op.alter_column('crew',
               existing_type=sa.INTEGER(),
               type_=sa.String(length=20),
               existing_nullable=False)
        batch_op.alter_column('passengers',
               existing_type=sa.INTEGER(),
               type_=sa.String(length=20),
               existing_nullable=False)
        batch_op.alter_column('cargo_capacity',
               existing_type=sa.INTEGER(),
               type_=sa.String(length=20),
               existing_nullable=False)
        batch_op.alter_column('hyperdrive_rating',
               existing_type=sa.INTEGER(),
               type_=sa.String(length=10),
               existing_nullable=False)
        batch_op.alter_column('MGLT',
               existing_type=sa.INTEGER(),
               type_=sa.String(length=10),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('starships', schema=None) as batch_op:
        batch_op.alter_column('MGLT',
               existing_type=sa.String(length=10),
               type_=sa.INTEGER(),
               existing_nullable=False)
        batch_op.alter_column('hyperdrive_rating',
               existing_type=sa.String(length=10),
               type_=sa.INTEGER(),
               existing_nullable=False)
        batch_op.alter_column('cargo_capacity',
               existing_type=sa.String(length=20),
               type_=sa.INTEGER(),
               existing_nullable=False)
        batch_op.alter_column('passengers',
               existing_type=sa.String(length=20),
               type_=sa.INTEGER(),
               existing_nullable=False)
        batch_op.alter_column('crew',
               existing_type=sa.String(length=20),
               type_=sa.INTEGER(),
               existing_nullable=False)
        batch_op.alter_column('max_atmosphering_speed',
               existing_type=sa.String(length=20),
               type_=sa.INTEGER(),
               existing_nullable=False)
        batch_op.alter_column('length',
               existing_type=sa.String(length=20),
               type_=sa.INTEGER(),
               existing_nullable=False)
        batch_op.alter_column('cost_in_credits',
               existing_type=sa.String(length=40),
               type_=sa.INTEGER(),
               existing_nullable=False)
        batch_op.alter_column('manufacturer',
               existing_type=sa.String(length=80),
               type_=sa.VARCHAR(length=40),
               existing_nullable=False)

    with op.batch_alter_table('planets', schema=None) as batch_op:
        batch_op.alter_column('population',
               existing_type=sa.String(length=80),
               type_=sa.INTEGER(),
               existing_nullable=False)
        batch_op.alter_column('diameter',
               existing_type=sa.String(length=10),
               type_=sa.INTEGER(),
               existing_nullable=False)
        batch_op.alter_column('orbital_period',
               existing_type=sa.String(length=10),
               type_=sa.INTEGER(),
               existing_nullable=False)
        batch_op.alter_column('rotation_period',
               existing_type=sa.String(length=10),
               type_=sa.INTEGER(),
               existing_nullable=False)

    with op.batch_alter_table('people', schema=None) as batch_op:
        batch_op.alter_column('mass',
               existing_type=sa.String(length=80),
               type_=sa.INTEGER(),
               existing_nullable=False)
        batch_op.alter_column('heigth',
               existing_type=sa.String(length=80),
               type_=sa.INTEGER(),
               existing_nullable=False)

    # ### end Alembic commands ###
