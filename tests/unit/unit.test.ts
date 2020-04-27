import { testDouble, expect } from './config/helpers';
import PoolFactory from '../../src/core/db/PoolFactory';
import TestPersistence from '../../src/modules/persistence/TestPersistence';
import UsuarioPersistence from '../../src/modules/persistence/UsuarioPersistence';
import Usuario from '../../src/modules/model/Usuario';
import Empresa from '../../src/modules/model/Empresa';

describe('Testes Unitários de Persistência', () => {
    const conexao = new PoolFactory().getPool();
    
    const usuario: Usuario = new Usuario();

    before(done => {
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
                done();
            })
        });
    })

    describe('Método listar()', () => {
        it('Deve retornar uma lista com todos os usuários', async (done) => {
            let usuarioPersistence: UsuarioPersistence = new UsuarioPersistence(conexao);

            const data = await usuarioPersistence.listar(usuario, -1);
            expect(data).to.be.an('array');
            expect(data[0]).to.have.keys(['id', 'nome', 'cpfCnpj', 'senha']);
            done();
        });
    });

    describe('Método quantidade()', () => {
        it('Deve retornar a quantidade de usuários de acordo com o filtro passado', async (done) => {
            let usuarioPersistence: UsuarioPersistence = new UsuarioPersistence(conexao);

            const data = await usuarioPersistence.quantidade(usuario);
            expect(data).to.be.an('number');
            expect(data).to.be.equals(1);
            done();
        });
    });

    describe('Método recuperar()', () => {
        it('Deve retornar um objeto do tipo Usuario', async (done) => {
            let usuarioPersistence: UsuarioPersistence = new UsuarioPersistence(conexao);

            const data = await usuarioPersistence.recuperar(1);
            expect(data).to.be.an('object');
            expect(data.nome).to.be.equals('Usuario Padrão');
            expect(data.cpfCnpj).to.be.equals('05204045309');
            expect(data.senha).to.be.equals('156489');
            done();
        });
    });

    describe('Método novo()', () => {
        it('Deve criar um novo usuário', async (done) => {
            let usuarioPersistence: UsuarioPersistence = new UsuarioPersistence(conexao);

            const data = await usuarioPersistence.novo(usuario);
            expect(data).to.be.an('object');
            expect(data.nome).to.be.equals('Usuario Padrão');
            expect(data.cpfCnpj).to.be.equals('05204045309');
            expect(data.senha).to.be.equals('156489');
            done();
        });
    });

    describe('Método atualizar()', () => {
        it('Deve atualizar o usuário padrão', async (done) => {
            let usuarioPersistence: UsuarioPersistence = new UsuarioPersistence(conexao);

            const usuario2: Usuario = { ...usuario }
            usuario2.nome = 'Luis Eduardo Miranda';
            usuario2.cpfCnpj = '00000000000';
            usuario2.senha = '159487'

            await usuarioPersistence.atualizar(usuario2);
            const data: Usuario = await usuarioPersistence.recuperar(1);

            expect(data).to.be.an('object');
            expect(data.nome).to.be.equals('Luis Eduardo Miranda');
            expect(data.cpfCnpj).to.be.equals('00000000000');
            expect(data.senha).to.be.equals('159487');
            done();
        });
    });

    describe('Método deletar()', () => {
        it('Deve deletar um usuário', async (done) => {
            let usuarioPersistence: UsuarioPersistence = new UsuarioPersistence(conexao);

            await usuarioPersistence.inativar(usuario.id);
            const data = await usuarioPersistence.quantidade(new Usuario());

            expect(data).to.be.an('number');
            expect(data).to.be.equals(0);
            done();
        });
    });
});