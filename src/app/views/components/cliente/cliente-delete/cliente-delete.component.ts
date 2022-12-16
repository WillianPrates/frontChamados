import { Component, OnInit, NgModule } from '@angular/core';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit{

  idCli = ''

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }

  constructor(
    private router: Router,
    private service: ClienteService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idCli = this.route.snapshot.paramMap.get('id')!
    this.findById();

  }

  delete(): void{
    this.service.delete(this.idCli).subscribe(resposta => {
      this.router.navigate(['clientes'])
      this.service.message('Cliente deletado com sucesso!')
    }, err => {
      if(err.error.error.match('possui ordens')){
        this.service.message(err.error.error);
      }
    })
  }

  findById():void{
    this.service.findById(this.idCli).subscribe(resposta => {
      this.cliente = resposta;
    })
  }

  cancel(): void {
    this.router.navigate(['clientes'])
  }

}