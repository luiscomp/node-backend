import Usuario from "../model/Usuario";
import Persistence from './Persistence'
import Constantes from '../utils/Constantes';

const CAMPOS = `usuario.id, usuario.nome, usuario.email, usuario.senha`;
const SELECT = `SELECT ${CAMPOS} FROM usuario`;
const SELECT_COUNT = `SELECT COUNT(*) AS quantidade FROM usuario`;
const INSERT = `INSERT INTO usuario (nome, email, senha) VALUES ( ? , ? , ? )`;
const UPDATE = `UPDATE usuario SET nome = ?, email = ?, senha = ? WHERE id = ?`;
const DELETE = `DELETE FROM usuario WHERE id = ? `;

class UsuarioPersistence {
    
    constructor() {}

    listar(usuario: Usuario, pagina: number): Promise<Array<Usuario>> {
        return new Promise(async (resolve, reject) => {
            let results: Array<Usuario>;
            let sql: string = SELECT;
            let parametros: Array<any>;

            try {
                if(!isNaN(pagina) && pagina >= 0) {
                    sql = sql.concat(` LIMIT ${pagina * Constantes.TAM_MAX_PAGINACAO}, ${Constantes.TAM_MAX_PAGINACAO}`);
                }

                results = await Persistence.conexao().query(sql);
                resolve(results);
            } catch (error) {
                reject(error.sqlMessage);
            }
        })
    }

    quantidade(usuario: Usuario, pagina: number): Promise<number> {
        return new Promise(async (resolve, reject) => {
            let results: Array<any>;
            try {
                results = await Persistence.conexao().query(SELECT_COUNT);
                resolve(results[0].quantidade);
            } catch (error) {
                reject(error.sqlMessage);
            }
        })
    }

    recuperar(id: number): Promise<Usuario> {
        return new Promise(async (resolve, reject) => {
            let results: Array<Usuario>;
            let sql: string = SELECT;
            try {
                sql = Persistence.incluirClausulaNoWhereAND(sql, ' id = ? ');

                results = await Persistence.conexao().query(sql, id);
                resolve(results[0]);
            } catch(error) {
                reject(error.sqlMessage);
            }
        })
    }

    novo(usuario: Usuario): Promise<Usuario> {
        return new Promise(async (resolve, reject) => {
            let results: any;
            let parametros = [
                usuario.nome,
                usuario.email,
                usuario.senha,
            ]
            try {
                results = await Persistence.conexao().query(INSERT, parametros);
                usuario.id = results.insertId;
                resolve(usuario);
             } catch(error) {
                reject(error.sqlMessage);
            }
        })
    }
    
    atualizar(usuario: Usuario): Promise<Usuario> {
        return new Promise(async (resolve, reject) => {
            let parametros = [
                usuario.nome,
                usuario.email,
                usuario.senha,
                usuario.id
            ]
            try {
                await Persistence.conexao().query(UPDATE, parametros);
                resolve(usuario);
             } catch(error) {
                reject(error.sqlMessage);
            }
        })
    }

    deletar(id: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await Persistence.conexao().query(DELETE, id);
                resolve();
             } catch(error) {
                reject(error.sqlMessage);
            }
        })
    }
}

export default new UsuarioPersistence();