import { Usuario } from "./acesso/usuario.model";
import * as firebase from 'firebase'
import { Injectable } from "@angular/core";
import { Router } from '@angular/router'

@Injectable()
export class Autenticacao {

    private token_id: string;

    constructor(private router: Router){}

    public cadastrarUsuario(usuario: Usuario): Promise<any> {

        return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resposta: any) => {

                delete usuario.senha

                //btoa: criptografa texto para base64 
                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set(usuario)
            })
            .catch((error: Error) => console.log(error))
    }

    public autenticar(email: string, senha: string): void{
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((resposta: any)=>{
                firebase.auth().currentUser.getIdToken()
                    .then((idToken: string)=> {
                        this.token_id = idToken
                        localStorage.setItem('idToken', idToken)
                        console.log('Token_Id-1', this.token_id)
                        this.router.navigate(['/home'])
                    })
                console.log('Token_Id-2', this.token_id)
            })
            .catch((error: Error)=>console.log(error))

        console.log('token_Id-3', this.token_id)
    }

    public autenticado(): boolean{

        if(this.token_id === undefined && localStorage.getItem('idToken') != null){
            this.token_id = localStorage.getItem('idToken')
        }

        if(this.token_id===undefined){
            this.router.navigate(['/'])
        }

        return this.token_id !== undefined
    }

    public sair(): void{
        firebase.auth().signOut()
            .then(()=>{
                localStorage.removeItem('idToken')
                this.token_id = undefined
                this.router.navigate(['/'])
            })
    }
} 