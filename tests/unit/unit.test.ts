import { testDouble, expect } from './config/helpers';
import PoolFactory from '../../src/core/db/PoolFactory';
import TestPersistence from '../../src/modules/persistence/TestPersistence';
import EmpresaPersistence from '../../src/modules/persistence/EmpresaPersistence';
import UsuarioPersistence from '../../src/modules/persistence/UsuarioPersistence';
import Usuario from '../../src/modules/model/Usuario';
import Empresa from '../../src/modules/model/Empresa';
import PerfilUsuario from '../../src/modules/model/enums/PerfilUsuario';

describe('Testes Unitários de Persistência', () => {
    const conexao = new PoolFactory().getPool();
    
    const empresa: Empresa = new Empresa();
    const usuario: Usuario = new Usuario();

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

    beforeEach((done) => {
        let testPersistence: TestPersistence = new TestPersistence(conexao);
        let empresaPersistence: EmpresaPersistence = new EmpresaPersistence(conexao);
        let usuarioPersistence: UsuarioPersistence = new UsuarioPersistence(conexao);
        
        testPersistence.limparSchema().then(() => {
            empresaPersistence.novo(empresa).then(() => {
                usuarioPersistence.novo(usuario).then(() => {
                    done();
                })
            })
        });
    })

    describe('Método listar()', () => {
        it('Deve retornar uma lista com todos os usuários', async (done) => {
            let usuarioPersistence: UsuarioPersistence = new UsuarioPersistence(conexao);

            const data = await usuarioPersistence.listar(usuario, -1);
            expect(data).to.be.an('array');
            expect(data[0]).to.have.keys(['id']);
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
            expect(data.nome).to.be.equals('Luis Eduardo Miranda Ferreira');
            expect(data.cpfCnpj).to.be.equals('05204045309');
            expect(data.senha).to.be.equals('123456');
            done();
        });
    });

    describe('Método novo()', () => {
        it('Deve criar um novo usuário', async (done) => {
            let usuarioPersistence: UsuarioPersistence = new UsuarioPersistence(conexao);

            const data = await usuarioPersistence.novo(usuario);
            expect(data).to.be.an('object');
            expect(data.nome).to.be.equals('Luis Eduardo Miranda Ferreira');
            expect(data.cpfCnpj).to.be.equals('05204045309');
            expect(data.senha).to.be.equals('123456');
            done();
        });
    });

    describe('Método atualizar()', () => {
        it('Deve atualizar o usuário padrão', async (done) => {
            let usuarioPersistence: UsuarioPersistence = new UsuarioPersistence(conexao);

            const usuario2: Usuario = { ...usuario }
            usuario2.nome = 'Luis Eduardo';
            usuario2.cpfCnpj = '00000000000';
            usuario2.senha = '159487'

            await usuarioPersistence.atualizar(usuario2);
            const data: Usuario = await usuarioPersistence.recuperar(1);

            expect(data).to.be.an('object');
            expect(data.nome).to.be.equals('Luis Eduardo');
            expect(data.cpfCnpj).to.be.equals('00000000000');
            expect(data.senha).to.be.equals('159487');
            done();
        });
    });

    describe('Método deletar()', () => {
        it('Deve deletar um usuário', async (done) => {
            let usuarioPersistence: UsuarioPersistence = new UsuarioPersistence(conexao);

            await usuarioPersistence.inativar(usuario.id);
            const data: Usuario = await usuarioPersistence.recuperar(1);

            expect(data).to.be.an('number');
            expect(data.inativo).to.be.equals(1);
            done();
        });
    });
});