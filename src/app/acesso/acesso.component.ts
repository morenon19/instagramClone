import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations: [
    trigger('animacao-banner', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({opacity: 0, transform: 'translate(-60px, 0px)'}),
        animate('500ms 0.5s ease-in-out') //duração, delay, aceleração
      ])
    ]),
    trigger('animacao-painel', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({opacity: 0, transform: 'translate(60px, 0px)'}),
        animate('1500ms 0.5s ease-in-out', keyframes([
          style({offset: 0.15, opacity: 1, transform: 'translateX(0)'}),
          style({offset: 0.86, opacity: 1, transform: 'translateX(0)'}),
          style({offset: 0.88, opacity: 1, transform: 'translateY(-10px)'}),
          style({offset: 0.90, opacity: 1, transform: 'translateY(10px)'}),
          style({offset: 0.92, opacity: 1, transform: 'translateY(-10px)'}),
          style({offset: 0.94, opacity: 1, transform: 'translateY(10px)'})
        ]))
      ]),
      transition('criado => errado', [
        animate('600ms 0ms ease-out', keyframes([
          style({offset: 0.10, opacity: 1, transform: 'translateY(-10px)'}),
          style({offset: 0.20, opacity: 1, transform: 'translateY(10px)'}),
          style({offset: 0.38, opacity: 1, transform: 'translateY(-10px)'}),
          style({offset: 0.48, opacity: 1, transform: 'translateY(10px)'}),
          style({offset: 0.58, opacity: 1, transform: 'translateY(-10px)'}),
          style({offset: 0.68, opacity: 1, transform: 'translateY(10px)'}),
          style({offset: 0.78, opacity: 1, transform: 'translateY(-10px)'}),
          style({offset: 0.88, opacity: 1, transform: 'translateY(10px)'}),
          style({offset: 0.98, opacity: 1, transform: 'translateY(-10px)'})
        ]))
      ])
    ])
  ]
})

export class AcessoComponent implements OnInit {

  public estado: string = 'criado'

  public cadastro: boolean = false

  constructor() { }

  ngOnInit() {
  }

  public exibirPainel(event: string):void{
    this.cadastro = event === 'cadastro' ? true:false
  }

  //Chamadas de funções no inicio e/ou final da animação:
    //No template:    (@animacao-painel.start)="comecoAnimacao()" (@animacao-painel.done)="finalAnimacao()"

  // public comecoAnimacao(): void{
  //   console.log('Começo da animação')
  // }
  // public finalAnimacao(): void{
  //   console.log('fim da animação')
  // }

  public animar(event: string): void{
    this.estado=event
    setTimeout(()=>this.estado='criado', 1000)
  }
 
}
