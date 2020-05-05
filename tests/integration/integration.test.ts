import * as HTTPStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import { app, request, expect, conexao } from './config/helpers';
import CodigosResposta from '../../src/utils/requests/CodigosResposta';
import Empresa from '../../src/modules/model/Empresa';
import Usuario from '../../src/modules/model/Usuario';
import EmpresaPersistence from '../../src/modules/persistence/EmpresaPersistence';
import UsuarioPersistence from '../../src/modules/persistence/UsuarioPersistence'
import TestPersistence from '../../src/modules/persistence/TestPersistence';
import PerfilUsuario from '../../src/modules/model/enums/PerfilUsuario';

describe('Testes de Integração', () => {

    'use strict';
    const config = require('../../src/config/config')();
    const empresa: Empresa = new Empresa();
    const usuario: Usuario = new Usuario();
    let token: string;

    before(done => {
        empresa.id = 1;
        empresa.codigo = '1';
        empresa.proprietario = 'Thays Ferreira dos Santos';
        empresa.cpfCnpj= '00000000000001'
        empresa.nomeEmpresarial = 'PET MANIA VARIDADE ANIMAL ME';
        empresa.nomeFantasia = 'PET MANIA';

        usuario.id = 1;
        usuario.nome = 'Luis Eduardo Miranda Ferreira';
        usuario.cpfCnpj = '05204045309';
        usuario.senha = '123456';
        usuario.perfil = PerfilUsuario[PerfilUsuario.GESTOR];
        usuario.empresa = empresa

        done();
    })

    beforeEach(async function() {
        this.timeout(5000);

        const testPersistence: TestPersistence = new TestPersistence(conexao);
        const empresaPersistence: EmpresaPersistence = new EmpresaPersistence(conexao);
        const usuarioPersistence: UsuarioPersistence = new UsuarioPersistence(conexao);

        await testPersistence.limparSchema();
        await empresaPersistence.novo(empresa);
        await usuarioPersistence.novo(usuario);

        token = jwt.sign({ id: 1 }, config.secret, { expiresIn: '30m' });
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
        it('Não deve autenticar por informar credenciais inválidas', done => {
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
                    expect(res.body.quantidade).to.be.equal(1)
                    done(error);
                });
        });
    });

    describe('GET /api/v1/usuario/:id', () => {
        it('Deve retornar um JSON do usuário de id informado', done => {
            request(app)
                .get(`/api/v1/usuario/${usuario.id}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.item).to.be.an('object');
                    expect(res.body.item.nome).to.be.equals('Luis Eduardo Miranda Ferreira');
                    expect(res.body.item.cpfCnpj).to.be.equals('05204045309');
                    expect(res.body.item.senha).to.be.equals('123456');
                    done(error);
                });
        });
    });

    describe('POST /api/v1/usuario/novo', () => {
        it('Deve gravar um novo usuário', done => {
            request(app)
                .post(`/api/v1/usuario/novo`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(usuario)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.item).to.be.an('object');
                    expect(res.body.item.nome).to.be.equals('Luis Eduardo Miranda Ferreira');
                    expect(res.body.item.cpfCnpj).to.be.equals('05204045309');
                    expect(res.body.item.senha).to.be.equals('123456');
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
        it('Deve editar um usuário existente', done => {
            const usuario2: Usuario = { 
                ...usuario, 
                nome: 'Luis Eduardo', 
                cpfCnpj: '00000000000', 
                senha: '159487' 
            }

            request(app)
                .post(`/api/v1/usuario/atualizar`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(usuario2)
                .end((error, res) => {
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.item).to.be.an('object');
                    expect(res.body.item.nome).to.be.equals('Luis Eduardo');
                    expect(res.body.item.cpfCnpj).to.be.equals('00000000000');
                    expect(res.body.item.senha).to.be.equals('159487');
                    done(error);
                });
        });
    });

    describe('POST /api/v1/usuario/atualizar', () => {
        it('Deve dar erro ao tentar atualizar um usuário com dados incompletos', done => {
            const usuario: Usuario = new Usuario();

            request(app)
                .post(`/api/v1/usuario/atualizar`)
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

    describe('POST /api/v1/usuario/:id/inativar', () => {
        it('Deve inativar um usuário', done => {
            request(app)
                .post(`/api/v1/usuario/${usuario.id}/inativar`)
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