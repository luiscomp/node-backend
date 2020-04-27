import * as HTTPStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import { app, request, expect } from './config/helpers';
import Usuario from '../../src/modules/model/Usuario';
import CodigosResposta from '../../src/utils/requests/CodigosResposta';
import UsuarioPersistence from '../../src/modules/persistence/UsuarioPersistence'
import TestPersistence from '../../src/modules/persistence/TestPersistence';
import Empresa from '../../src/modules/model/Empresa';
import PoolFactory from '../../src/core/db/PoolFactory';

describe('Testes de Integração', () => {

    'use strict';
    const config = require('../../server/config/config')();
    let token: String;
    const usuario: Usuario = new Usuario();
    const conexao = new PoolFactory().getPool();

    before((done) => {
        usuario.id = 1;
        usuario.nome = 'Usuario Padrão';
        usuario.cpfCnpj = '05204045309';
        usuario.empresa = new Empresa();
        usuario.empresa.codigo = '1';
        done();
    })


    beforeEach((done) => {
        let testPersistence: TestPersistence = new TestPersistence(conexao);
        let usuarioPersistence: UsuarioPersistence = new UsuarioPersistence(conexao);

        testPersistence.limparSchema().then(() => {
            usuarioPersistence.novo(usuario).then(() => {
                token = jwt.sign({ id: 1 }, config.secret, { expiresIn: '30m' });
                done();
            })
        });
    })

    describe('POST /api/v1/auth/token ', () => {
        it('Deve dar erro ao tentar autenticar sem informar login e/ou senha', done => {
            const usuario: Usuario = new Usuario();

            request(app)
                .post('/api/v1/auth/token')
                .send(usuario)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.BAD_REQUEST);
                    expect(res.body.status).to.be.equals(CodigosResposta[CodigosResposta.SCHEMA_INVALIDO]);
                    done(error)
                })
        });
    });

    describe('POST /api/v1/auth/token ', () => {
        it('Deve autenticar e receber um token de acesso', done => {
            const usuario: Usuario = new Usuario();
            usuario.cpfCnpj = '05204045309';
            usuario.senha = '123456';
            usuario.empresa = new Empresa();
            usuario.empresa.codigo = '1';

            request(app)
                .post('/api/v1/auth/token')
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

    describe('POST /api/v1/auth/token ', () => {
        it('Não deve autenticar nem gerar token de autenticação', done => {
            const usuario: Usuario = new Usuario();
            usuario.cpfCnpj = '00000000000';
            usuario.senha = '984651';
            usuario.empresa = new Empresa();
            usuario.empresa.codigo = '1';

            request(app)
                .post('/api/v1/auth/token')
                .send(usuario)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.UNAUTHORIZED);
                    expect(res.body).to.empty;
                    done(error)
                })
        });
    });
    
    describe('POST /api/v1/usuario/listar', () => {
        it('Deve retornar um JSON com todos os usuários', done => {
            request(app)
                .post(`/api/v1/usuario/listar`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.lista).to.be.an('array')
                    expect(res.body.lista[0]).to.have.keys(['id', 'nome', 'cpfCnpj', 'senha'])
                    expect(res.body.quantidade).to.be.equal(1)
                    done(error);
                });
        });
    });

    describe('GET /api/v1/usuario/:id', () => {
        it('Deve retornar um JSON com o usuário informado', done => {
            request(app)
                .get(`/api/v1/usuario/${1}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.item).to.be.an('object');
                    expect(res.body.item.nome).to.be.equals('Usuario Padrão');
                    expect(res.body.item.cpfCnpj).to.be.equals('05204045309');
                    expect(res.body.item.senha).to.be.equals('156489');
                    done(error);
                });
        });
    });

    describe('POST /api/v1/usuario/novo', () => {
        it('Deve gravar um novo usuário se passado sem o id', done => {
            const usuario: Usuario = new Usuario();
            usuario.nome = 'Novo Usuario';
            usuario.cpfCnpj = '00000000000';
            usuario.senha = '159487'

            request(app)
                .post(`/api/v1/usuario/novo`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(usuario)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.item).to.be.an('object');
                    expect(res.body.item.nome).to.be.equals('Novo Usuario');
                    expect(res.body.item.cpfCnpj).to.be.equals('00000000000');
                    expect(res.body.item.senha).to.be.equals('159487');
                    done(error);
                });
        });
    });

    describe('POST /api/v1/usuario/novo', () => {
        it('Deve dar erro ao tentar gravar um usuário com os dados incompletos', done => {
            const usuario: Usuario = new Usuario();

            request(app)
                .post(`/api/v1/usuario/novo`)
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

    describe('POST /api/v1/usuario/atualizar', () => {
        it('Deve editar um usuário existente se passado com o id', done => {
            const usuario: Usuario = new Usuario();
            usuario.id = 1;
            usuario.nome = 'Luis Eduardo Miranda';
            usuario.cpfCnpj = '00000000000';
            usuario.senha = '159487'

            request(app)
                .post(`/api/v1/usuario/atualizar`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(usuario)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.item).to.be.an('object');
                    expect(res.body.item.nome).to.be.equals('Luis Eduardo Miranda');
                    expect(res.body.item.cpfCnpj).to.be.equals('00000000000');
                    expect(res.body.item.senha).to.be.equals('159487');
                    done(error);
                });
        });
    });

    describe('POST /api/v1/usuario/atualizar', () => {
        it('Deve dar erro ao tentar atualizar um usuário sem id ou os dados obrigatórios', done => {
            const usuario: Usuario = new Usuario();

            request(app)
                .post(`/api/v1/usuario/atualizar`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(usuario)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.BAD_REQUEST);
                    expect(res.body.status).to.be.equals(CodigosResposta['SCHEMA_INVALIDO']);
                    done(error);
                });
        });
    });

    describe('POST /api/v1/usuario/:id/inativar', () => {
        it('Deve inativar um usuário', done => {
            request(app)
                .delete(`/api/v1/usuario/${1}/inativar`)
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