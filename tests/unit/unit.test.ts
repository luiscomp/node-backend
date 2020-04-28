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

    beforeEach(async function() {
        this.timeout(5000);

        let testPersistence: TestPersistence = new TestPersistence(conexao);
        let empresaPersistence: EmpresaPersistence = new EmpresaPersistence(conexao);
        let usuarioPersistence: UsuarioPersistence = new UsuarioPersistence(conexao);

        await testPersistence.limparSchema();
        await empresaPersistence.novo(empresa);
        await usuarioPersistence.novo(usuario);
    })

    describe('Método listar()', () => {
        it('Deve retornar uma lista com todos os usuários', async () => {
            let usuarioPersistence: UsuarioPersistence = new UsuarioPersistence(conexao);

            const data = await usuarioPersistence.listar(usuario, -1);

            await expect(Promise.resolve(data)).to.eventually.be.an('array');
            await expect(Promise.resolve(data[0])).to.eventually.have.deep.property('id');
        });
    });

    describe('Método quantidade()', () => {
        it('Deve retornar a quantidade de usuários de acordo com o filtro passado', async () => {
            let usuarioPersistence: UsuarioPersistence = new UsuarioPersistence(conexao);

            const data = await usuarioPersistence.quantidade(usuario);

            await expect(Promise.resolve(data)).to.eventually.be.an('number');
            await expect(Promise.resolve(data)).to.eventually.be.equals(1);
        });
    });

    describe('Método recuperar()', () => {
        it('Deve retornar um objeto do tipo Usuario', async () => {
            let usuarioPersistence: UsuarioPersistence = new UsuarioPersistence(conexao);

            const data = await usuarioPersistence.recuperar(1);

            await expect(Promise.resolve(data)).to.eventually.be.an('object');
            await expect(Promise.resolve(data.nome)).to.eventually.be.equals('Luis Eduardo Miranda Ferreira');
            await expect(Promise.resolve(data.cpfCnpj)).to.eventually.be.equals('05204045309');
            await expect(Promise.resolve(data.senha)).to.eventually.be.equals('123456');
        });
    });

    describe('Método novo()', () => {
        it('Deve criar um novo usuário', async () => {
            let usuarioPersistence: UsuarioPersistence = new UsuarioPersistence(conexao);

            const data = await usuarioPersistence.novo(usuario);
            await expect(Promise.resolve(data)).to.eventually.be.an('object');
            await expect(Promise.resolve(data.nome)).to.eventually.be.equals('Luis Eduardo Miranda Ferreira');
            await expect(Promise.resolve(data.cpfCnpj)).to.eventually.be.equals('05204045309');
            await expect(Promise.resolve(data.senha)).to.eventually.be.equals('123456');
        });
    });

    describe('Método atualizar()', () => {
        it('Deve atualizar o usuário padrão', async () => {
            let usuarioPersistence: UsuarioPersistence = new UsuarioPersistence(conexao);

            const usuario2: Usuario = { 
                ...usuario, 
                nome: 'Luis Eduardo', 
                cpfCnpj: '00000000000', 
                senha: '159487' 
            }

            await usuarioPersistence.atualizar(usuario2);
            const data: Usuario = await usuarioPersistence.recuperar(usuario2.id);

            await expect(Promise.resolve(data)).to.eventually.be.an('object');
            await expect(Promise.resolve(data.nome)).to.be.eventually.equals('Luis Eduardo');
            await expect(Promise.resolve(data.cpfCnpj)).to.eventually.be.equals('00000000000');
            await expect(Promise.resolve(data.senha)).to.eventually.be.equals('159487');
        });
    });

    describe('Método inativar()', () => {
        it('Deve inativar um usuário', async () => {
            let usuarioPersistence: UsuarioPersistence = new UsuarioPersistence(conexao);

            await usuarioPersistence.inativar(usuario.id);
            const data: Usuario = await usuarioPersistence.recuperar(usuario.id);

            await expect(Promise.resolve(data)).to.eventually.be.an('object');
            await expect(Promise.resolve(data.inativo)).to.eventually.be.equals(1);
        });
    });
});