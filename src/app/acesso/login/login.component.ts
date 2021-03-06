import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Autenticacao } from '../../autenticacao.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public message: string

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, Validators.required),
    'senha': new FormControl(null, [Validators.minLength(3), Validators.required])
  })

  @Output() public exiberPainel: EventEmitter<string> = new EventEmitter()
  @Output() public animar: EventEmitter<string> = new EventEmitter()

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
    setTimeout(()=>{
      this.message = this.autenticacao.getLoginMessage()
      if (this.message !== undefined) this.animar.emit('errado')
    }, 500)
  }

}
