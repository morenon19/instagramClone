import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public exiberPainel: EventEmitter<string> = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  public exibirPainelCadastro():void{
    this.exiberPainel.emit('cadastro')
  }

}
