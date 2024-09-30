import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common'; // Adicionar importação
import { Firestore, getDoc, collection, getDocs, updateDoc, doc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms'; // Certifique-se de que FormsModule está importado

@Component({
  selector: 'app-nutricionista-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule], // Adicionar FormsModule aqui
  templateUrl: './nutricionista-dashboard.component.html',
  styleUrls: ['./nutricionista-dashboard.component.scss']
})
export class NutricionistaDashboardComponent implements OnInit {
  patients: any[] = [];
  selectedPatient: string = '';
  newDiet: string = '';
  currentContent: string = 'content2'; // Valor inicial

  textoBase: string = `
  **Plano de Dieta Semanal**

  **Café da manhã:**
  - Opção 1: [Insira aqui]
  - Opção 2: [Insira aqui]
  - Opção 3: [Insira aqui]

  **Almoço:**
  - Opção 1: [Insira aqui]
  - Opção 2: [Insira aqui]
  - Opção 3: [Insira aqui]

  **Lanche da tarde:**
  - Opção 1: [Insira aqui]
  - Opção 2: [Insira aqui]
  - Opção 3: [Insira aqui]

  **Jantar:**
  - Opção 1: [Insira aqui]
  - Opção 2: [Insira aqui]
  - Opção 3: [Insira aqui]

  **Ceia:**
  - Opção 1: [Insira aqui]
  - Opção 2: [Insira aqui]
  - Opção 3: [Insira aqui]

  **Observações:**
  - Obs 1: [Insira aqui]
  - Obs 2: [Insira aqui]
  - Obs 3: [Insira aqui]

  **Outros:**
  - [Insira observações adicionais aqui]
`;
dietaEditada: string = this.textoBase;
salvarDieta() {
  // Implementar lógica para salvar a dieta editada
  console.log(this.dietaEditada);
}

  constructor(private authService: AuthService, private firestore: Firestore) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  async loadPatients() {
    const patientsCollection = collection(this.firestore, 'clientes');
    const patientSnapshot = await getDocs(patientsCollection);
    this.patients = patientSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(this.patients); // Verifica se os dados estão sendo carregados corretamente

  }


  async updateDiet() {
    if (!this.selectedPatient || !this.newDiet) {
      alert('Por favor, selecione um paciente e insira uma nova dieta.');
      return;
    }

    const patientDocRef = doc(this.firestore, 'clientes', this.selectedPatient);
    const docSnapshot = await getDoc(patientDocRef);
    
    if (docSnapshot.exists()) {
      await updateDoc(patientDocRef, { diet: this.newDiet });
      alert('Dieta atualizada com sucesso!');
    } else {
      console.error('Documento não encontrado');
      alert('Erro: Documento não encontrado para atualização.');
    }
  }    

  logout() {
    this.authService.logout();
  }

  showContent(content: string) {
    this.currentContent = content;
  }
}
