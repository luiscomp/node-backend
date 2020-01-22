import { testDouble, expect } from './config/helpers';
import UsuarioPersistence from '../../server/persistence/UsuarioPersistence'

describe('Testes Unitários do Controller', () => {
    describe('Método listar()', () => {
        it('Deve retornar uma lista com todos os usuários', () => {
            const persistence = new UsuarioPersistence();

            return persistence.listar(null, -1).then(data => {
                expect(data).to.be.an('array');
                expect(data[0]).to.have.keys(['id', 'nome', 'email', 'senha'])
            })
        });
    });

    describe('Método quantidade()', () => {
        it('Deve retornar a quantidade de usuários de acordo com o filtro passado', () => {
            const persistence = new UsuarioPersistence();

            return persistence.quantidade(null, -1).then(data => {
                expect(data).to.be.an('number');
                expect(data).to.equals(2);
            })
        });
    });


    describe('Método recuperar()', () => {
        it('Deve retornar um objeto do tipo IUsuario', () => {
            
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