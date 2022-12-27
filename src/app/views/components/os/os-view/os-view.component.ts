import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { OS } from 'src/app/models/ordem-servico';
import { OsService } from 'src/app/services/os.service';

@Component({
  selector: 'app-os-view',
  templateUrl: './os-view.component.html',
  styleUrls: ['./os-view.component.css']
})
export class OsViewComponent implements OnInit{
  os: OS = {
    tecnico: '',
    cliente: '',
    observacoes: '',
    status: '',
    prioridade: ''
  }

    constructor(private route: ActivatedRoute,
      private router: Router,
      private osService: OsService){    }

    ngOnInit(): void{
      this.os.id = this.route.snapshot.paramMap.get("id");
      this.findById();

    }

    findById(): void{
      this.osService.findById(this.os.id).subscribe(resposta=>{
        this.os = resposta;
      })
    }

    voltar(): void{
     this.router.navigate(['os'])
    }
}
