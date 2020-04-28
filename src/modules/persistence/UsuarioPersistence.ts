import Usuario from "../model/Usuario";
import PersistenceUtils from '../../utils/PersistenceUtils';
import Constantes from '../../utils/Constantes';

const TABELA = ` Usuario `;
const CAMPOS = ` Usuario.id, Usuario.nome, Usuario.cpfCnpj, Usuario.senha, Usuario.perfil, Usuario.dataCadastro, Usuario.ultimoAcesso, Usuario.inativo `;
const SELECT = ` SELECT ${CAMPOS}, Empresa.id, Empresa.nomeFantasia FROM Usuario JOIN Empresa ON Empresa.id = Usuario.idEmpresa `;
const SELECT_COUNT = ` SELECT COUNT(*) AS quantidade FROM Usuario `;
const INSERT = ` INSERT INTO Usuario (nome, cpfCnpj, senha, perfil, dataCadastro, idEmpresa) VALUES ( ? , ? , ? , ? , DATE(CONVERT_TZ(NOW(),'GMT', 'America/Fortaleza')) , ? ) `;
const UPDATE = ` UPDATE Usuario SET nome = ? , cpfCnpj = ? , perfil = ? WHERE id = ? `;
const INATIVAR = ` UPDATE Usuario SET inativo = 1 WHERE id = ? `;

class UsuarioPersistence extends PersistenceUtils {
    
    private conexao: any;

    constructor(conexao: any) {
        super();
        this.conexao = conexao;
    }

    listar(usuario: Usuario, pagina: number): Promise<Array<Usuario>> {
        return new Promise(async (resolve, reject) => {
            let results: Array<Usuario>;
            let sql: string = SELECT;
            try {
                sql = this.incluirFiltros(sql, usuario, TABELA)

                if(!isNaN(pagina) && pagina >= 0) {
                    sql = sql.concat(` LIMIT ${pagina * Constantes.TAM_MAX_PAGINACAO}, ${Constantes.TAM_MAX_PAGINACAO} `);
                }

                results = await this.conexao.query(sql, this.montarParametros(usuario));
                resolve(results);
            } catch (error) {
                reject(error.sqlMessage);
            }
        })
    }

    quantidade(usuario: Usuario): Promise<number> {
        return new Promise(async (resolve, reject) => {
            let results: Array<any>;
            let sql: string = SELECT_COUNT;
            try {
                sql = this.incluirFiltros(sql, usuario, TABELA)
                
                results = await this.conexao.query(sql, this.montarParametros(usuario));
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
                sql = this.incluirClausulaNoWhereAND(sql, ' Usuario.id = ? ');

                let options = {sql: sql, nestTables: true};
                results = await this.conexao.query(options, id);

                let usuario = { 
                    ...results[0]['Usuario'],
                    empresa: { 
                        ...results[0]['Empresa']
                    } 
                };

                resolve(usuario);
            } catch(error) {
                reject(error.sqlMessage);
            }
        })
    }

    novo(usuario: Usuario): Promise<Usuario> {
        return new Promise(async (resolve, reject) => {
            let results: any;
            let parametros = [];
            try {
                parametros.push(usuario.nome);
                parametros.push(usuario.cpfCnpj);
                parametros.push(usuario.senha);
                parametros.push(usuario.perfil);
                parametros.push(usuario.empresa.id);

                results = await this.conexao.query(INSERT, parametros);
                usuario.id = results.insertId;

                resolve(usuario);
            } catch(error) {
                reject(error.sqlMessage);
            }
        })
    }
    
    atualizar(usuario: Usuario): Promise<Usuario> {
        return new Promise(async (resolve, reject) => {
            let sql: string = UPDATE;
            let parametros = [];
            try {
                if(usuario.senha && usuario.senha.length > 0) {
                    sql = this.incluirCampoNoUpdate(sql, 'senha', usuario.senha)
                }

                parametros.push(usuario.nome)
                parametros.push(usuario.cpfCnpj)
                parametros.push(usuario.perfil)
                parametros.push(usuario.id)

                await this.conexao.query(sql, parametros);
                resolve(usuario);
            } catch(error) {
                reject(error.sqlMessage);
            }
        })
    }

    inativar(id: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.conexao.query(INATIVAR, id);
                resolve();
            } catch(error) {
                reject(error.sqlMessage);
            }
        })
    }
}

export default UsuarioPersistence