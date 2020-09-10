"""database migrated

Revision ID: 86708a8ed216
Revises: 
Create Date: 2020-09-08 11:28:15.403048

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '86708a8ed216'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('blacklist_tokens',
                    sa.Column('id', postgresql.UUID(
                        as_uuid=True), nullable=False),
                    sa.Column('token', sa.String(length=500), nullable=False),
                    sa.Column('blacklisted_on', sa.DateTime(), nullable=False),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('token')
                    )
    op.create_table('exercises',
                    sa.Column('id', postgresql.UUID(
                        as_uuid=True), nullable=False),
                    sa.Column('name', sa.String(length=255), nullable=False),
                    sa.Column('sets', sa.Integer(), nullable=False),
                    sa.Column('reps', sa.Integer(), nullable=False),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('id')
                    )
    op.create_table('routines',
                    sa.Column('id', postgresql.UUID(
                        as_uuid=True), nullable=False),
                    sa.Column('title', sa.String(length=255), nullable=True),
                    sa.Column('description', sa.Text(), nullable=True),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('id')
                    )
    op.create_table('user',
                    sa.Column('id', postgresql.UUID(
                        as_uuid=True), nullable=False),
                    sa.Column('email', sa.String(length=255), nullable=False),
                    sa.Column('username', sa.String(
                        length=255), nullable=True),
                    sa.Column('password_hash', sa.String(
                        length=100), nullable=True),
                    sa.Column('registered_on', sa.DateTime(), nullable=False),
                    sa.Column('is_verified', sa.Boolean(), nullable=False),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('email'),
                    sa.UniqueConstraint('username')
                    )
    op.create_table('exercise_identifier',
                    sa.Column('routine_id', postgresql.UUID(
                        as_uuid=True), nullable=True),
                    sa.Column('exercise_id', postgresql.UUID(
                        as_uuid=True), nullable=True),
                    sa.ForeignKeyConstraint(
                        ['exercise_id'], ['exercises.id'], ),
                    sa.ForeignKeyConstraint(['routine_id'], ['routines.id'], )
                    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('exercise_identifier')
    op.drop_table('user')
    op.drop_table('routines')
    op.drop_table('exercises')
    op.drop_table('blacklist_tokens')
    # ### end Alembic commands ###