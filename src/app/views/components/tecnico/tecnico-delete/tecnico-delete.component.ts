import { Component, OnInit, NgModule } from '@angular/core';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit{

  idTec = ''

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }

  constructor(
    private router: Router,
    private service: TecnicoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idTec = this.route.snapshot.paramMap.get('id')!
    this.findById();

  }

  delete(): void{
    this.service.delete(this.idTec).subscribe(resposta => {
      this.router.navigate(['tecnicos'])
      this.service.message('Técnico deletado com sucesso!')
    }, err => {
      if(err.error.error.match('possui ordens')){
        this.service.message(err.error.error);
      }
    })
  }

  findById():void{
    this.service.findById(this.idTec).subscribe(resposta => {
      this.tecnico = resposta;
    })
  }

  cancel(): void {
    this.router.navigate(['tecnicos'])
  }

}