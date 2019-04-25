import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms';
import { Autenticacao } from '../../autenticacao.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'senha': new FormControl(null)
  })

  @Output() public exiberPainel: EventEmitter<string> = new EventEmitter()

  constructor(private autenticacao: Autenticacao) { }

  ngOnInit() {
  }

  public exibirPainelCadastro():void{
    this.exiberPainel.emit('cadastro')
  }

  public autenticar():void{
    this.autenticacao.autenticar(
      this.formulario.value.email,
      this.formulario.value.senha
    )
  }

}
