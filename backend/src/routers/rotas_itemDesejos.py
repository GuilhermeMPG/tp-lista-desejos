import sys
import os

# Obtém o caminho absoluto do diretório pai do diretório atual (onde está este script)
caminho_projeto = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

# Adiciona o caminho do projeto ao sys.path
sys.path.append(caminho_projeto)


from fastapi import APIRouter
from fastapi import Depends, status, HTTPException
from sqlalchemy.orm import Session
from src.infra.sqlalchemy.config.database import get_db
from src.infra.sqlalchemy.repositorios.repositorio_itemDesejo import RepositorioItemDesejo
from src.routers.auth_utils import obter_usuario_logado
from src.schemas.schemas import ItemDesejo, Usuario





router = APIRouter()

@router.post('/item_desejo', status_code=status.HTTP_201_CREATED)
def criar_ItemDesejo(ItemDesejo:ItemDesejo,current_user: Usuario = Depends(obter_usuario_logado), session: Session = Depends(get_db)):
    ItemDesejo.usuario_id = current_user.id
    ItemDesejo_criado = RepositorioItemDesejo(session).criar(ItemDesejo)
    if not ItemDesejo_criado:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail='Item não encontrado!')
    return {'message': 'Item criado com sucesso!', 'item_criado': ItemDesejo_criado  }

@router.patch('/item_desejo/{id}', status_code=status.HTTP_200_OK)
def atualizar_ItemDesejo(id:int, itemDesejo:ItemDesejo, current_user: Usuario = Depends(obter_usuario_logado), session: Session = Depends(get_db)):

    itemDesejo_bd:ItemDesejo = RepositorioItemDesejo(session).obter_umItem_por_id(id, current_user.id)
    if not itemDesejo_bd:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail='Item não encontrado!')
    itemDesejo_bd.nome = itemDesejo.nome if itemDesejo.nome  else itemDesejo_bd.nome
    itemDesejo_bd.descricao = itemDesejo.descricao if itemDesejo.descricao else itemDesejo_bd.descricao
    itemDesejo_bd.prioridade = itemDesejo.prioridade if itemDesejo.prioridade else itemDesejo_bd.prioridade
    itemDesejo_bd.preco = itemDesejo.preco if itemDesejo.preco else itemDesejo_bd.preco
    itemDesejo_bd.adquirido = itemDesejo.adquirido   if itemDesejo.adquirido else itemDesejo_bd.adquirido
    itemDesejo_bd.usuario_id = itemDesejo_bd.usuario_id    
    
    RepositorioItemDesejo(session).editar(id, itemDesejo_bd)

   
    return {'message': 'Usuário atualizado com sucesso!', 'item_alterado': itemDesejo_bd  }

@router.get('/item_desejo', status_code=status.HTTP_200_OK)
def listar_ItemDesejos(id:int=None, current_user: Usuario = Depends(obter_usuario_logado),session: Session = Depends(get_db)):

    if current_user.admin and id != None:
        ItemDesejos = RepositorioItemDesejo(session).listar(id)
    else:
        id_enviar = current_user.id
        ItemDesejos = RepositorioItemDesejo(session).listar(id_enviar)
    if not ItemDesejos:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail='Item não encontrado!')
    return ItemDesejos
@router.get('/item_desejo/{id}',status_code=status.HTTP_200_OK)
def obter_ItemDesejo(id:int,current_user: Usuario = Depends(obter_usuario_logado), session: Session=Depends(get_db)):
    if current_user.admin and id:
        item=RepositorioItemDesejo(session).obter_umItem_por_id (id)
    else:        
        item=RepositorioItemDesejo(session).obter_umItem_por_id(id, current_user.id)
    if not item:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail='Item não encontrado!')    
    return  item 

@router.delete('/item_desejo/{id}',status_code=status.HTTP_200_OK)
def remover_ItemDesejos(id:int,current_user: Usuario = Depends(obter_usuario_logado), session: Session=Depends(get_db)):
    if current_user.admin and id:
        item_removido=RepositorioItemDesejo(session).remover(id)
    else:        
        item_removido=RepositorioItemDesejo(session).remover(id, current_user.id)  
    if not item_removido:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail='Item não encontrado!')   
    return {'message': 'Item removido com sucesso!', 'item_removido': item_removido}