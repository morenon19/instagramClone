import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Usuario } from '../usuario.model'
import { Autenticacao } from 'src/app/autenticacao.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter()
  @Output() public animar: EventEmitter<string> = new EventEmitter()

  public message: string

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, Validators.required),
    'nome_completo': new FormControl(null, Validators.required),
    'nome_usuario': new FormControl(null, Validators.required),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  constructor(private autenticacao: Autenticacao) { }

  ngOnInit() {
  }

  public exibirPainelLogin(): void {
    this.exibirPainel.emit('login')
  }

  public cadastrarUsuario(): void {
    let usuario: Usuario = new Usuario(
      this.formulario.value.email,
      this.formulario.value.nome_completo,
      this.formulario.value.nome_usuario,
      this.formulario.value.senha
    )
    this.autenticacao.cadastrarUsuario(usuario)
      .then(()=>{
        this.message = this.autenticacao.getCadMessage()
        setTimeout(() => {
          if(this.message===undefined){
            alert('Cliente cadastrado com sucesso!')
            this.exibirPainelLogin()
          }else this.animar.emit('errado') 
          this.autenticacao.clearMessages()
        }, 500);
      })
  }
}
