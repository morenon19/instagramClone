import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { Bd } from '../../bd.service'
import * as firebase from 'firebase'
import { Publicacao } from '../publicacoes/publicacao.model'
import { Progresso } from 'src/app/progresso.service';
import { interval, Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null)
  })

  public email: string
  private publicacao: Publicacao

  public progressoPublicacao: string = 'pendente'
  public porcentagemUpload: number

  @Output() public atualizarTimeline: EventEmitter<any> = new EventEmitter<any>()

  constructor(
    private bd: Bd,
    private progresso: Progresso
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
    })
  }

  public publicar(): void {
    this.publicacao.email = this.email
    this.publicacao.titulo = this.formulario.value.titulo
    this.bd.publicar(this.publicacao)

    let acompanhamentoUpload = interval(1000) //Observable.interval

    let continua = new Subject()
    continua.next(true)

    acompanhamentoUpload
      .pipe(takeUntil(continua))
      .subscribe(() => {
        //console.log(this.progresso.status)
        //console.log(this.progresso.estado)
        this.progressoPublicacao = 'andamento'
        this.porcentagemUpload = Math.round((this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes) * 100)
        if (this.progresso.status === 'concluido') {
          continua.next(false)
          this.progressoPublicacao = 'concluido'
          this.atualizarTimeline.emit()
          setTimeout(()=>{
            this.progressoPublicacao='pendente'
          }, 3000)
        }
      })
  }

  public preparaImagemUpload(evento: Event): void {
    this.publicacao = new Publicacao("","","", "", (<HTMLInputElement>evento.target).files)
  }
}

