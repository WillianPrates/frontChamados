import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { OS } from 'src/app/models/ordem-servico';
import { Tecnico } from 'src/app/models/tecnico';
import { ClienteService } from 'src/app/services/cliente.service';
import { OsService } from 'src/app/services/os.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-os-update',
  templateUrl: './os-update.component.html',
  styleUrls: ['./os-update.component.css']
})
export class OsUpdateComponent {

  tecnicos: Tecnico[] = []
  clientes: Cliente[] = []

  os: OS = {
    tecnico: '',
    cliente: '',
    observacoes: '',
    status: '',
    prioridade: ''

  }

  constructor(
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService,
    private OsService: OsService,
    private router: Router,
    private route: ActivatedRoute
  ){

  }

  ngOnInit(): void{
    this.os.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.listarTecnicos();
    this.listarClientes();
  }

  findById(): void{
    this.OsService.findById(this.os.id).subscribe(resposta=>{
      this.os = resposta;
    })
  }

  listarTecnicos(): void{
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    })
  }

  listarClientes(): void{
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }

  update(): void{
    this.OsService.update(this.os).subscribe(resposta=> {
      this.OsService.message("Ordem de serviço atualizada com sucesso!"),
      this.router.navigate(['os'])
    })
  }

  cancel(): void{
    this.router.navigate(['os'])
  }

}