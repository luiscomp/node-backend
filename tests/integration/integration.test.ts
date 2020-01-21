import * as HTTPStatus from 'http-status';
import { app, request, expect } from './config/helpers';

describe('Testes de Integração', () => {

    'use strict';
    
    describe('POST /api/usuario/listar', () => {
        it('Deve retornar um JSON com todos os usuários', done => {
            request(app)
                .post(`/api/usuario/listar`)
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
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    done(error);
                });
        });
    });

    describe('POST /api/usuario/novo', () => {
        it('Deve gravar um novo usuário se passado sem o id', done => {
            const user = {
                nome: "Teste"
            }

            request(app)
                .post(`/api/usuario/novo`)
                .send(user)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    done(error);
                });
        });
    });

    describe('PUT /api/usuario/:id/atualizar', () => {
        it('Deve editar um usuário existente se passado com o id', done => {
            const user = {
                nome: "Teste Update"
            }

            request(app)
                .put(`/api/usuario/${1}/atualizar`)
                .send(user)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    done(error);
                });
        });
    });

    describe('DELETE /api/usuario/:id/deletar', () => {
        it('Deve deletar um usuário', done => {
            request(app)
                .delete(`/api/usuario/${1}/deletar`)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    done(error);
                });
        });
    });
});