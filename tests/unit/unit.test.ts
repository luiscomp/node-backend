import { testDouble, expect } from './config/helpers';
import UsuarioPersistence from '../../server/persistence/UsuarioPersistence'

describe('Testes Unitários do Controller', () => {
    describe('Método listar()', () => {
        it('Deve retornar uma lista com todos os usuários', async () => {
            const persistence = new UsuarioPersistence();

            const data = await persistence.listar(null, -1);
            expect(data).to.be.an('array');
            expect(data[0]).to.have.keys(['id', 'nome', 'email', 'senha']);
        });
    });

    describe('Método quantidade()', () => {
        it('Deve retornar a quantidade de usuários de acordo com o filtro passado', async () => {
            const persistence = new UsuarioPersistence();

            const data = await persistence.quantidade(null, -1);
            expect(data).to.be.an('number');
            expect(data).to.be.equals(2);
        });
    });


    describe('Método recuperar()', () => {
        it('Deve retornar um objeto do tipo IUsuario', async () => {
            const persistence = new UsuarioPersistence();

            const data = await persistence.recuperar(1);
            expect(data).to.be.an('object');
            expect(data.nome).to.equals('Luis Eduardo');
            expect(data.email).to.equals('luizeduardo354@gmail.com');
            expect(data.senha).to.equals('123456');
        });
    });

    describe('Método novo()', () => {
        it('Deve criar um novo usuário', () =>{

        });
    });

    describe('Método atualizar()', () => {
        it('Deve retornar uma lista com todos os usuários', () =>{

        });
    });

    describe('Método deletar()', () => {
        it('Deve deletar um usuário', () =>{

        });
    });
});