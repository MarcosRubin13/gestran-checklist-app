import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

export interface ChecklistItem {
  id: number;
  verificado: boolean;
  observacao: string;
  item: string;
}

export interface Checklist {
  id: number;
  usuario: string;
  etapa: string;
  situacao: boolean | null;
  dataCadastro: string;
  itens: ChecklistItem[];
}

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {
  private apiUrl = `${environment.apiUrl}/Checklist`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getChecklists(): Observable<Checklist[]> {
    return this.http.get<Checklist[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getChecklistById(id: number): Observable<Checklist> {
    return this.http.get<Checklist>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  createChecklist(checklist: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, checklist, { headers: this.getAuthHeaders() });
  }

  startChecklist(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/iniciar`, { id, etapa: 'INICIADO' }, { headers: this.getAuthHeaders() });
  }

  finalizeChecklist(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/finalizar`, { id, etapa: 'FINALIZADO', situacao: true }, { headers: this.getAuthHeaders() });
  }

  verificarChecklistItem(checklistId: number, itemId: number, item: ChecklistItem): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${checklistId}/item/${itemId}/verificar`, item, { headers: this.getAuthHeaders() });
  }

  setChecklistToAguardandoFinalizacao(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/status/aguardando-finalizacao`, { id }, { headers: this.getAuthHeaders() });
  }
}

