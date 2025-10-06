import { Injectable, inject } from '@angular/core';
import { 
  Firestore, 
  collection, 
  collectionData, 
  doc, 
  docData, 
  addDoc, 
  updateDoc,
  query,
  where,
  orderBy 
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Hotel, HotelCreate } from '../types/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private firestore = inject(Firestore);
  private collectionName = 'hoteis';

  // Buscar todos os hotéis ativos
  getHoteis(): Observable<Hotel[]> {
    console.log('🔄 Buscando hotéis do Firebase...');
    const hoteisRef = collection(this.firestore, this.collectionName);
    const q = query(
      hoteisRef, 
      where('ativo', '==', true),
      orderBy('nome')
    );
    return collectionData(q, { idField: 'id' }) as Observable<Hotel[]>;
  }

  // Buscar hotel por ID
  getHotelById(id: string): Observable<Hotel> {
    console.log('🔍 Buscando hotel por ID:', id);
    const hotelRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return docData(hotelRef, { idField: 'id' }) as Observable<Hotel>;
  }

  // Criar novo hotel
  async createHotel(hotel: HotelCreate): Promise<string> {
    try {
      console.log('💾 Salvando hotel no Firebase:', hotel);
      
      const hoteisRef = collection(this.firestore, this.collectionName);
      const docRef = await addDoc(hoteisRef, {
        ...hotel,
        ativo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      console.log('✅ Hotel salvo com sucesso! ID:', docRef.id);
      return docRef.id;
      
    } catch (error) {
      console.error('❌ Erro ao salvar hotel:', error);
      throw error;
    }
  }

  // Atualizar hotel
  async updateHotel(id: string, hotel: Partial<Hotel>): Promise<void> {
    try {
      console.log('🔄 Atualizando hotel:', id);
      const hotelRef = doc(this.firestore, `${this.collectionName}/${id}`);
      await updateDoc(hotelRef, {
        ...hotel,
        updatedAt: new Date()
      });
      console.log('✅ Hotel atualizado com sucesso!');
    } catch (error) {
      console.error('❌ Erro ao atualizar hotel:', error);
      throw error;
    }
  }

  // Deletar hotel (soft delete)
  async deleteHotel(id: string): Promise<void> {
    try {
      console.log('🗑️ Deletando hotel:', id);
      const hotelRef = doc(this.firestore, `${this.collectionName}/${id}`);
      await updateDoc(hotelRef, {
        ativo: false,
        updatedAt: new Date()
      });
      console.log('✅ Hotel deletado com sucesso!');
    } catch (error) {
      console.error('❌ Erro ao deletar hotel:', error);
      throw error;
    }
  }
}