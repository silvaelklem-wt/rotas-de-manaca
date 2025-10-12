import { Injectable } from '@angular/core';
import { Room, RoomCreate } from '../types/room.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  
  // Quartos fictícios para o hotel - AGORA DECLARADO CORRETAMENTE
  private quartosMock: Room[] = [
    {
      id: '1',
      numero: '101',
      tipo: 'Suíte Luxo',
      descricao: 'Suíte espaçosa com vista para o rio, hidromassagem e varanda privativa',
      preco: 450,
      capacidade: 3,
      comodidades: ['Hidromassagem', 'Varanda', 'Ar Condicionado', 'TV LED', 'Frigobar', 'Wi-Fi'],
      fotos: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400'],
      disponivel: true,
      destaque: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      numero: '102',
      tipo: 'Suíte Familiar',
      descricao: 'Ampla suíte familiar perfeita para casais com crianças, com duas camas de casal',
      preco: 380,
      capacidade: 4,
      comodidades: ['2 Camas de Casal', 'Varanda', 'Ar Condicionado', 'TV LED', 'Frigobar', 'Wi-Fi'],
      fotos: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400'],
      disponivel: true,
      destaque: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      numero: '201',
      tipo: 'Suíte Executiva',
      descricao: 'Suíte moderna para executivos, com escrivaninha e vista panorâmica',
      preco: 320,
      capacidade: 2,
      comodidades: ['Escrivaninha', 'Vista Panorâmica', 'Ar Condicionado', 'TV LED', 'Frigobar', 'Wi-Fi', 'Cofre'],
      fotos: ['https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400'],
      disponivel: true,
      destaque: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '4',
      numero: '202',
      tipo: 'Quarto Standard',
      descricao: 'Confortável quarto standard com todas as comodidades essenciais',
      preco: 220,
      capacidade: 2,
      comodidades: ['Ar Condicionado', 'TV LED', 'Frigobar', 'Wi-Fi', 'Banheiro Privativo'],
      fotos: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400'],
      disponivel: true,
      destaque: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '5',
      numero: '301',
      tipo: 'Suíte Presidencial',
      descricao: 'Nosso quarto mais luxuoso com sala de estar separada e serviço de mordomo',
      preco: 680,
      capacidade: 3,
      comodidades: ['Sala de Estar', 'Serviço de Mordomo', 'Hidromassagem', 'Varanda', 'Ar Condicionado', '2 TVs LED', 'Frigobar', 'Wi-Fi', 'Cofre'],
      fotos: ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400'],
      disponivel: true,
      destaque: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '6',
      numero: '302',
      tipo: 'Quarto Econômico',
      descricao: 'Quarto aconchegante e econômico, ideal para estadias curtas',
      preco: 180,
      capacidade: 2,
      comodidades: ['Ventilador', 'TV LED', 'Wi-Fi', 'Banheiro Privativo'],
      fotos: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400'],
      disponivel: true,
      destaque: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  getQuartos(): Observable<Room[]> {
    console.log('🛏️ Retornando quartos do hotel');
    return of(this.quartosMock);
  }

  getQuartoById(id: string): Observable<Room> {
    console.log('🔍 Buscando quarto por ID:', id);
    const quarto = this.quartosMock.find(q => q.id === id);
    if (!quarto) {
      throw new Error('Quarto não encontrado');
    }
    return of(quarto);
  }

  async updateQuarto(id: string, quarto: Partial<Room>): Promise<void> {
    console.log('🔄 Atualizando quarto:', id, quarto);
    const index = this.quartosMock.findIndex(q => q.id === id);
    if (index !== -1) {
      this.quartosMock[index] = { 
        ...this.quartosMock[index], 
        ...quarto, 
        updatedAt: new Date() 
      };
    }
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Método adicional para criar quarto (se necessário no futuro)
  async createQuarto(quarto: RoomCreate): Promise<string> {
    console.log('➕ Criando novo quarto:', quarto);
    
    const novoQuarto: Room = {
      ...quarto,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.quartosMock.push(novoQuarto);
    console.log('✅ Quarto criado com ID:', novoQuarto.id);
    
    return novoQuarto.id;
  }

  // Método para deletar quarto (se necessário no futuro)
  async deleteQuarto(id: string): Promise<void> {
    console.log('🗑️ Deletando quarto:', id);
    const index = this.quartosMock.findIndex(q => q.id === id);
    if (index !== -1) {
      this.quartosMock.splice(index, 1);
    }
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}