import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HotelService } from '../../services/hotel.service';
import { HotelCreate } from '../../types/hotel.model';

interface UploadedImage {
  file: File;
  url: string;
  size: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  private hotelService = inject(HotelService);
  
  // Propriedades do formulário
  novoHotel: HotelCreate = {
    nome: '',
    descricao: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    telefone: '',
    email: '',
    estrelas: 3,
    precoMedio: 0,
    comodidades: [],
    fotos: []
  };

  // Propriedades de estado - AGORA DECLARADAS CORRETAMENTE
  comodidadeInput = '';
  fotoInput = '';
  uploadedImages: UploadedImage[] = [];
  selectedFiles: File[] = [];
  isDragOver = false;
  salvando = false; // ← AGORA DECLARADA
  mensagemSucesso = ''; // ← AGORA DECLARADA
  mensagemErro = ''; // ← AGORA DECLARADA

  // Método para lidar com erro de carregamento de imagem
  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPs6VIm8gbsOjbyBjYXJyZWdhZG88L3RleHQ+Cjwvc3ZnPg==';
  }

  // Upload de arquivos
  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    this.processFiles(files);
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    
    const files = event.dataTransfer?.files;
    if (files) {
      this.processFiles(files);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  processFiles(files: FileList): void {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      if (!file.type.startsWith('image/')) {
        alert(`O arquivo "${file.name}" não é uma imagem válida.`);
        continue;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert(`A imagem "${file.name}" é muito grande. Máximo 5MB.`);
        continue;
      }

      this.selectedFiles.push(file);
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedImages.push({
          file: file,
          url: e.target.result,
          size: this.formatFileSize(file.size)
        });
      };
      reader.readAsDataURL(file);
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  removerUploadedImage(index: number): void {
    this.uploadedImages.splice(index, 1);
    this.selectedFiles.splice(index, 1);
  }

  adicionarComodidade(): void {
    if (this.comodidadeInput.trim()) {
      this.novoHotel.comodidades.push(this.comodidadeInput.trim());
      this.comodidadeInput = '';
    }
  }

  removerComodidade(index: number): void {
    this.novoHotel.comodidades.splice(index, 1);
  }

  adicionarFoto(): void {
    if (this.fotoInput.trim()) {
      this.novoHotel.fotos.push(this.fotoInput.trim());
      this.fotoInput = '';
    }
  }

  removerFoto(index: number): void {
    this.novoHotel.fotos.splice(index, 1);
  }

  async salvarHotel(): Promise<void> {
    // Validação básica
    if (!this.novoHotel.nome || !this.novoHotel.descricao) {
      this.mensagemErro = '⚠️ Preencha pelo menos o nome e descrição do hotel!';
      return;
    }

    this.salvando = true;
    this.mensagemErro = '';
    this.mensagemSucesso = '';

    try {
      console.log('📤 Enviando dados para o Firebase...', this.novoHotel);
      
      const hotelId = await this.hotelService.createHotel(this.novoHotel);
      
      this.mensagemSucesso = `✅ Hotel cadastrado com sucesso!\n\nID: ${hotelId}\nNome: ${this.novoHotel.nome}\nFotos: ${this.novoHotel.fotos.length} URLs + ${this.uploadedImages.length} uploads`;
      
      this.limparFormulario();
      
      // Limpa a mensagem após 8 segundos
      setTimeout(() => {
        this.mensagemSucesso = '';
      }, 8000);
      
    } catch (error: any) {
      console.error('❌ Erro detalhado:', error);
      
      let mensagem = 'Erro ao cadastrar hotel. ';
      
      if (error.code === 'permission-denied') {
        mensagem += 'Permissão negada. Verifique as regras do Firebase.';
      } else if (error.code === 'unavailable') {
        mensagem += 'Firebase indisponível. Verifique sua conexão.';
      } else {
        mensagem += `Detalhes: ${error.message}`;
      }
      
      this.mensagemErro = mensagem;
    } finally {
      this.salvando = false;
    }
  }

  limparFormulario(): void {
    this.novoHotel = {
      nome: '',
      descricao: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: '',
      telefone: '',
      email: '',
      estrelas: 3,
      precoMedio: 0,
      comodidades: [],
      fotos: []
    };
    this.comodidadeInput = '';
    this.fotoInput = '';
    this.uploadedImages = [];
    this.selectedFiles = [];
    this.isDragOver = false;
    this.mensagemErro = '';
  }
}