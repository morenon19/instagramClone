import * as firebase from 'firebase'
import { Publicacao } from './home/publicacoes/publicacao.model'
import { Injectable } from '@angular/core';
import { Progresso } from './progresso.service';

@Injectable()
export class Bd {
    constructor(private progresso: Progresso) { }

    public publicar(publicacao: Publicacao): void {

        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({ titulo: publicacao.titulo })
            .then((resposta: any) => {

                //let nomeImagem = publicacao.titulo.replace(/\s/g,'').concat(Date.now().toString())
                let nomeImagem = resposta.key

                firebase.storage().ref(`imagens/${nomeImagem}`)
                    .put(publicacao.imagem[0])
                    .on(firebase.storage.TaskEvent.STATE_CHANGED, //Listener de mudanças
                        (snapshot: any) => { //Acompanhamento do processo
                            this.progresso.status = 'andamento'
                            this.progresso.estado = snapshot
                            //console.log(this.progresso.estado)
                        },
                        (error) => { //Erro durante o precessamento
                            this.progresso.status = 'erro'
                            console.log(error)
                        },
                        () => { // Finalização do processo
                            this.progresso.status = 'concluido'
                            console.log('upload complete')
                        })
            })
    }

    public getPublicacoes(email: string): Promise<Publicacao[]> {

        return new Promise((resolve, reject) => {
            //Consultar publicações
            firebase.database().ref(`publicacoes/${btoa(email)}`)
                .orderByKey()
                .once('value')
                .then((snapshot: firebase.database.DataSnapshot) => {

                    let publicacoes: Publicacao[] = []

                    snapshot.forEach((childSnapshot: firebase.database.DataSnapshot) => {
                        //consultar URL da imagem
                        firebase.storage().ref()
                            .child(`imagens/${childSnapshot.key}`)
                            .getDownloadURL()
                            .then((url: string) => {
                                //Consultar nome de usuário
                                firebase.database().ref(`usuario_detalhe/${btoa(email)}`)
                                    .once('value')
                                    .then((snapshot: firebase.database.DataSnapshot) => {

                                        let publicacao: Publicacao = new Publicacao(
                                            snapshot.val().nome_usuario,
                                            email,
                                            childSnapshot.val().titulo,
                                            url
                                        )

                                        publicacoes.push(publicacao)
                                    })
                            })
                    })
                    
                    resolve(publicacoes)
                })
        })


    }

}