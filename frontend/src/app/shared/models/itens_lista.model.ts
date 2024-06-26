export interface itens_List {
  id?: number;
  product: string;
  description: string;
  price: number;
  priority: number;
}


export interface itens_List_back {
  id?: number;
  nome: string;
  descricao: string;
  prioridade: number;
  preco: number;
  adquirido?: boolean;
  usuario_id?: string;
}
