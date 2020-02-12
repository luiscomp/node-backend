import { testDouble, expect } from './config/helpers';
import UsuarioPersistence from '../../server/persistence/UsuarioPersistence'
import Usuario from '../../server/model/Usuario';

describe('Testes Unitários do Controller', () => {
    describe('Método listar()', () => {
        it('Deve retornar uma lista com todos os usuários', async () => {
            const data = await UsuarioPersistence.listar(null, -1);
            expect(data).to.be.an('array');
            expect(data[0]).to.have.keys(['id', 'nome', 'email', 'senha']);
        });
    });

    describe('Método quantidade()', () => {
        it('Deve retornar a quantidade de usuários de acordo com o filtro passado', async () => {
            const data = await UsuarioPersistence.quantidade(null, -1);
            expect(data).to.be.an('number');
            expect(data).to.be.equals(2);
        });
    });


    describe('Método recuperar()', () => {
        it('Deve retornar um objeto do tipo IUsuario', async () => {
            const data = await UsuarioPersistence.recuperar(1);
            expect(data).to.be.an('object');
            expect(data.nome).to.be.equals('Luis Eduardo');
            expect(data.email).to.be.equals('luizeduardo354@gmail.com');
            expect(data.senha).to.be.equals('123456');
        });
    });

    describe('Método novo()', () => {
        it('Deve criar um novo usuário', async () =>{
            const usuario: Usuario = new Usuario();
            usuario.nome = 'Novo Usuario';
            usuario.email = 'novo@email.com';
            usuario.senha = '159487'

            const data = await UsuarioPersistence.novo(usuario);
            expect(data).to.be.an('object');
            expect(data.nome).to.be.equals('Novo Usuario');
            expect(data.email).to.be.equals('novo@email.com');
            expect(data.senha).to.be.equals('159487');
        });
    });

    describe('Método atualizar()', () => {
        it('Deve retornar uma lista com todos os usuários', async () =>{
            const usuario: Usuario = new Usuario();
            usuario.id = 1;
            usuario.nome = 'Luis Eduardo Miranda';
            usuario.email = 'novo@email.com';
            usuario.senha = '159487'

            await UsuarioPersistence.atualizar(usuario);
            const data: Usuario = await UsuarioPersistence.recuperar(1);

            expect(data).to.be.an('object');
            expect(data.nome).to.be.equals('Luis Eduardo Miranda');
            expect(data.email).to.be.equals('novo@email.com');
            expect(data.senha).to.be.equals('159487');
        });
    });

    describe('Método deletar()', () => {
        it('Deve deletar um usuário', async () =>{
            await UsuarioPersistence.deletar(1);
            const data = await UsuarioPersistence.quantidade(null, 1);

            expect(data).to.be.an('number');
            expect(data).to.be.equals(2);
        });
    });
});