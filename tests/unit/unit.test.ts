import { testDouble, expect } from './config/helpers';
import UsuarioPersistence from '../../server/persistence/UsuarioPersistence'
import TestPersistence from '../../server/persistence/TestPersistence';
import Usuario from '../../server/model/Usuario';

describe('Testes Unitários de Persistência', () => {

    const usuario: Usuario = {
        id: 1,
        nome: 'Usuario Padrão',
        email: 'padrao@email.com',
        senha: '156489'
    }

    beforeEach((done) => {
        TestPersistence.limparSchema().then(() => {
            UsuarioPersistence.novo(usuario).then(() => {
                done();
            })
        });
    })

    after(() => {
        // process.exit();
    })

    describe('Método listar()', () => {
        it('Deve retornar uma lista com todos os usuários', async () => {
            const data = await UsuarioPersistence.listar(usuario, -1);
            expect(data).to.be.an('array');
            expect(data[0]).to.have.keys(['id', 'nome', 'email', 'senha']);
        });
    });

    describe('Método quantidade()', () => {
        it('Deve retornar a quantidade de usuários de acordo com o filtro passado', async () => {
            const data = await UsuarioPersistence.quantidade(usuario);
            expect(data).to.be.an('number');
            expect(data).to.be.equals(1);
        });
    });

    describe('Método recuperar()', () => {
        it('Deve retornar um objeto do tipo Usuario', async () => {
            const data = await UsuarioPersistence.recuperar(1);
            expect(data).to.be.an('object');
            expect(data.nome).to.be.equals('Usuario Padrão');
            expect(data.email).to.be.equals('padrao@email.com');
            expect(data.senha).to.be.equals('156489');
        });
    });

    describe('Método novo()', () => {
        it('Deve criar um novo usuário', async () =>{
            const data = await UsuarioPersistence.novo(usuario);
            expect(data).to.be.an('object');
            expect(data.nome).to.be.equals('Usuario Padrão');
            expect(data.email).to.be.equals('padrao@email.com');
            expect(data.senha).to.be.equals('156489');
        });
    });

    describe('Método atualizar()', () => {
        it('Deve atualizar o usuário padrão', async () =>{
            const usuario2: Usuario = { ...usuario }
            usuario2.nome = 'Luis Eduardo Miranda';
            usuario2.email = 'novo@email.com';
            usuario2.senha = '159487'

            await UsuarioPersistence.atualizar(usuario2);
            const data: Usuario = await UsuarioPersistence.recuperar(1);

            expect(data).to.be.an('object');
            expect(data.nome).to.be.equals('Luis Eduardo Miranda');
            expect(data.email).to.be.equals('novo@email.com');
            expect(data.senha).to.be.equals('159487');
        });
    });

    describe('Método deletar()', () => {
        it('Deve deletar um usuário', async () =>{
            await UsuarioPersistence.deletar(usuario.id);
            const data = await UsuarioPersistence.quantidade(new Usuario());

            expect(data).to.be.an('number');
            expect(data).to.be.equals(0);
        });
    });
});