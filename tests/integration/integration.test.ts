import * as HTTPStatus from 'http-status';
import { app, request, expect } from './config/helpers';
import Usuario from '../../server/model/Usuario';

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

    describe('POST /api/usuario/atualizar', () => {
        it('Deve editar um usuário existente se passado com o id', done => {
            const usuario: Usuario = new Usuario();
            usuario.id = 1;
            usuario.nome = 'Luis Eduardo Miranda';
            usuario.email = 'novo@email.com';
            usuario.senha = '159487'

            request(app)
                .post(`/api/usuario/atualizar`)
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