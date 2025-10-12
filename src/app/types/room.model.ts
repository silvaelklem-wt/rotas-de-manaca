export interface Room {
  id: string;
  numero: string;
  tipo: string;
  descricao: string;
  preco: number;
  capacidade: number;
  comodidades: string[];
  fotos: string[];
  disponivel: boolean;
  destaque: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoomCreate {
  numero: string;
  tipo: string;
  descricao: string;
  preco: number;
  capacidade: number;
  comodidades: string[];
  fotos: string[];
  disponivel: boolean;
  destaque: boolean;
}