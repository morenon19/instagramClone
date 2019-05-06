import { Component, OnInit } from '@angular/core';
import { Bd } from '../../bd.service'
import * as firebase from 'firebase'
import { Publicacao } from './publicacao.model';
@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  constructor(private bd: Bd) { }

  public email: string
  public publicacoes: Publicacao[]

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user)=>{
      this.email = user.email

      this.attTimeline()
    })
  }

  public attTimeline():void {
    this.bd.getPublicacoes(this.email)
      .then((publicacoes: Publicacao[])=>{
        this.publicacoes = publicacoes
      })
      .catch((error: any)=>{
        console.log(error)
      })
  }

}
