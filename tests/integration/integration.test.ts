import * as HTTPStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import { app, request, expect } from './config/helpers';
import Usuario from '../../server/model/Usuario';
import CodigosResposta from '../../server/utils/CodigosResposta';

describe('Testes de Integração', () => {

    'use strict';
    const config = require('../../server/config/config')();
    let token: String;

    beforeEach((done) => {
        token = jwt.sign({ id: 1 }, config.secret, { expiresIn: '30m' });
        done();
    })

    describe('POST /api/auth/token ', () => {
        it('Deve autenticar e receber um token de acesso', done => {
            const usuario: Usuario = new Usuario();
            usuario.email = 'luizeduardo354@gmail.com';
            usuario.senha = '123456';

            request(app)
                .post('/api/auth/token')
                .send(usuario)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.item).to.be.an('object');
                    expect(res.body.item.id).to.be.equals(1);
                    expect(res.body.token).to.not.empty
                    done(error)
                })
        });
    });

    describe('POST /api/auth/token ', () => {
        it('Não deve autenticar nem gerar token de autenticação', done => {
            const usuario: Usuario = new Usuario();
            usuario.email = 'email@errado.com';
            usuario.senha = '984651';

            request(app)
                .post('/api/auth/token')
                .send(usuario)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.UNAUTHORIZED);
                    expect(res.body).to.empty;
                    done(error)
                })
        });
    });
    
    describe('POST /api/usuario/listar', () => {
        it('Deve retornar um JSON com todos os usuários', done => {
            request(app)
                .post(`/api/usuario/listar`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.lista).to.be.an('array')
                    expect(res.body.lista[0]).to.have.keys(['id', 'nome', 'email', 'senha'])
                    done(error);
                });
        });
    });

    describe('GET /api/usuario/:id', () => {
        it('Deve retornar um JSON com o usuário informado', done => {
            request(app)
                .get(`/api/usuario/${1}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.item).to.be.an('object');
                    expect(res.body.item.nome).to.be.equals('Luis Eduardo');
                    expect(res.body.item.email).to.be.equals('luizeduardo354@gmail.com');
                    expect(res.body.item.senha).to.be.equals('123456');
                    done(error);
                });
        });
    });

    describe('POST /api/usuario/novo', () => {
        it('Deve gravar um novo usuário se passado sem o id', done => {
            const usuario: Usuario = new Usuario();
            usuario.nome = 'Novo Usuario';
            usuario.email = 'novo@email.com';
            usuario.senha = '159487'

            request(app)
                .post(`/api/usuario/novo`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(usuario)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.item).to.be.an('object');
                    expect(res.body.item.nome).to.be.equals('Novo Usuario');
                    expect(res.body.item.email).to.be.equals('novo@email.com');
                    expect(res.body.item.senha).to.be.equals('159487');
                    done(error);
                });
        });
    });

    describe('POST /api/usuario/novo', () => {
        it('Deve dar erro ao tentar gravar um usuário com os dados incompletos', done => {
            const usuario: Usuario = new Usuario();

            request(app)
                .post(`/api/usuario/novo`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(usuario)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.BAD_REQUEST);
                    expect(res.body.status).to.be.equals(CodigosResposta[CodigosResposta.SCHEMA_INVALIDO]);
                    done(error);
                });
        });
    });

    describe('POST /api/usuario/atualizar', () => {
        it('Deve editar um usuário existente se passado com o id', done => {
            const usuario: Usuario = new Usuario();
            usuario.id = 1;
            usuario.nome = 'Luis Eduardo Miranda';
            usuario.email = 'novo@email.com';
            usuario.senha = '159487'

            request(app)
                .post(`/api/usuario/atualizar`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(usuario)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.item).to.be.an('object');
                    expect(res.body.item.nome).to.be.equals('Luis Eduardo Miranda');
                    expect(res.body.item.email).to.be.equals('novo@email.com');
                    expect(res.body.item.senha).to.be.equals('159487');
                    done(error);
                });
        });
    });

    describe('POST /api/usuario/atualizar', () => {
        it('Deve dar erro ao tentar atualizar um usuário sem id ou os dados obrigatórios', done => {
            const usuario: Usuario = new Usuario();

            request(app)
                .post(`/api/usuario/atualizar`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(usuario)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.BAD_REQUEST);
                    expect(res.body.status).to.be.equals(CodigosResposta[CodigosResposta.SCHEMA_INVALIDO]);
                    done(error);
                });
        });
    });

    describe('DELETE /api/usuario/:id/deletar', () => {
        it('Deve deletar um usuário', done => {
            request(app)
                .delete(`/api/usuario/${1}/deletar`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    done(error);
                });
        });
    });
});