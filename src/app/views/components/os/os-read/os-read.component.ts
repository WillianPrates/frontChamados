import { AfterViewInit, Component, ViewChild, } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OS } from 'src/app/models/ordem-servico';
import { ClienteService } from 'src/app/services/cliente.service';
import { OsService } from 'src/app/services/os.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-os-read',
  templateUrl: './os-read.component.html',
  styleUrls: ['./os-read.component.css']
})
export class OsReadComponent implements AfterViewInit {

  ListaOs: OS[] = [];
  
    displayedColumns: string[] = ['tecnico', 'cliente', 'abertura', 'fechamento', 'prioridade', 'status', 'action'];
    dataSource = new MatTableDataSource<OS>(this.ListaOs);
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  
    constructor(private service : OsService,
      private router: Router,
      private tecnicoService: TecnicoService,
      private clienteService: ClienteService
      ){}
  
    ngAfterViewInit() {
      this.findAll();
    }
  
    findAll():void{
      this.service.findAll().subscribe((reposta) =>{
        this.ListaOs = reposta;
        this.listarTecnico();
        this.listarCliente();
        this.dataSource = new MatTableDataSource<OS>(this.ListaOs);
        this.dataSource.paginator = this.paginator;
      })
    }
  
    navigateToCreate(): void{
      this.router.navigate(['os/create'])
    }

    listarTecnico(): void{

      this.ListaOs.forEach(x => {
        this.tecnicoService.findById(x.tecnico).subscribe(resposta =>{
          x.tecnico = resposta.nome
        })
      })
    }
    

    listarCliente(): void{
      this.ListaOs.forEach(x => {
        this.clienteService.findById(x.cliente).subscribe(resposta =>{
          x.cliente = resposta.nome
        })
      })
    }

    prioridadeCor(x : any){
      if(x == 'BAIXA'){
        return 'baixa'
      }else if(x == 'MEDIA'){
        return 'media'
      }else{
        return 'alta'
      }
    }

  }