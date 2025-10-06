export interface Hotel {
  id: string;
  nome: string;
  descricao: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  telefone: string;
  email: string;
  estrelas: number;
  precoMedio: number;
  comodidades: string[];
  fotos: string[];
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface HotelCreate {
  nome: string;
  descricao: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  telefone: string;
  email: string;
  estrelas: number;
  precoMedio: number;
  comodidades: string[];
  fotos: string[];
}