import { Component, OnInit } from '@angular/core';
import { ChecklistService } from '../services/checklist.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit {
  checklists: any[] = [];

  constructor(
    private checklistService: ChecklistService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadChecklists();
  }

  loadChecklists() {
    this.checklistService.getChecklists().subscribe(
      data => {
        this.checklists = data;
      },
      error => {
        this.toastr.error('Erro ao carregar checklists', 'Erro');
      }
    );
  }

  createChecklist() {
    const newChecklist = {
      usuario: 'user1',
      tipo: 'SAIDA',
      placa: 'ABC-2A12',
      motorista: 'Marcos'
    };
    this.checklistService.createChecklist(newChecklist).subscribe(
      response => {
        this.toastr.success('Checklist criado com sucesso', 'Sucesso');
        this.loadChecklists();
      },
      error => {
        this.toastr.error('Erro ao criar checklist', 'Erro');
      }
    );
  }

  startChecklist(id: number) {
    this.checklistService.startChecklist(id).subscribe(
      response => {
        this.toastr.success('Checklist iniciado com sucesso', 'Sucesso');
        this.loadChecklists();
      },
      error => {
        this.toastr.error('Erro ao iniciar checklist', 'Erro');
      }
    );
  }

  finalizeChecklist(id: number) {
    this.checklistService.finalizeChecklist(id).subscribe(
      response => {
        this.toastr.success('Checklist finalizado com sucesso', 'Sucesso');
        this.loadChecklists();
      },
      error => {
        this.toastr.error('Erro ao finalizar checklist', 'Erro');
      }
    );
  }
}
