import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChecklistService, ChecklistItem } from '../services/checklist.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-checklist',
  templateUrl: './verify-checklist.component.html',
  styleUrls: ['./verify-checklist.component.css']
})
export class VerifyChecklistComponent implements OnInit {
  checklistId: number;
  items: ChecklistItem[] = [];
  currentIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private checklistService: ChecklistService,
    private toastr: ToastrService
  ) {
    this.checklistId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadChecklistItems();
  }

  loadChecklistItems() {
    this.checklistService.getChecklistById(this.checklistId).subscribe(
      response => {
        this.items = response.itens;
      },
      error => {
        this.toastr.error('Erro ao carregar itens do checklist', 'Erro');
      }
    );
  }

  verifyItem() {
    const item = this.items[this.currentIndex];
    this.checklistService.verificarChecklistItem(this.checklistId, item.id, item).subscribe(
      response => {
        this.toastr.success('Item verificado com sucesso', 'Sucesso');
        this.currentIndex++;
        if (this.currentIndex >= this.items.length) {
          this.setChecklistToAguardandoFinalizacao();
        }
      },
      error => {
        this.toastr.error('Erro ao verificar item', 'Erro');
      }
    );
  }

  setChecklistToAguardandoFinalizacao() {
    this.checklistService.setChecklistToAguardandoFinalizacao(this.checklistId).subscribe(
      response => {
        this.toastr.success('Checklist atualizado para AGUARDANDO_FINALIZAÇÃO', 'Sucesso');
        this.router.navigate(['/checklists']);
      },
      error => {
        this.toastr.error('Erro ao atualizar checklist', 'Erro');
      }
    );
  }
}

