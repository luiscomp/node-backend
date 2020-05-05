import Empresa from "../model/Empresa";
import PersistenceUtils from '../../utils/PersistenceUtils';
import Constantes from '../../utils/Constantes';

const TABELA = ` Empresa `;
const CAMPOS = ` Empresa.id, Empresa.codigo, Empresa.proprietario, Empresa.cpfCnpj, Empresa.nomeEmpresarial, Empresa.nomeFantasia, Empresa.dataCadastro, Empresa.inativo `;
const SELECT = ` SELECT ${CAMPOS} FROM Empresa `;
const SELECT_COUNT = ` SELECT COUNT(*) AS quantidade FROM Empresa `;
const INSERT = ` INSERT INTO Empresa (codigo, proprietario, cpfCnpj, nomeEmpresarial, nomeFantasia, dataCadastro) VALUES ( ?, ?, ?, ?, ?, DATE(CONVERT_TZ(NOW(),'GMT', 'America/Fortaleza'))); `;
const UPDATE = ` UPDATE Empresa SET codigo = ?, proprietario = ?, cpfCnpj = ?, nomeEmpresarial = ?, nomeFantasia = ? WHERE id = ? `;
const INATIVAR = ` UPDATE Empresa SET inativo = ? WHERE id = ? `;

class EmpresaPersistence extends PersistenceUtils {
    
    private conexao: any;

    constructor(conexao: any) {
        super();
        this.conexao = conexao;
    }

    listar(empresa: Empresa, pagina: number): Promise<Array<Empresa>> {
        return new Promise(async (resolve, reject) => {
            let results: Array<Empresa>;
            let sql: string = SELECT;
            try {
                sql = this.incluirFiltros(sql, empresa, TABELA)

                if(!isNaN(pagina) && pagina >= 0) {
                    sql = sql.concat(` LIMIT ${pagina * Constantes.TAM_MAX_PAGINACAO}, ${Constantes.TAM_MAX_PAGINACAO} `);
                }

                results = await this.conexao.query(sql, this.montarParametros(empresa));
                resolve(results);
            } catch (error) {
                reject(error.sqlMessage);
            }
        })
    }

    quantidade(empresa: Empresa): Promise<number> {
        return new Promise(async (resolve, reject) => {
            let results: Array<any>;
            let sql: string = SELECT_COUNT;
            try {
                sql = this.incluirFiltros(sql, empresa, TABELA)
                
                results = await this.conexao.query(sql, this.montarParametros(empresa));
                resolve(results[0].quantidade);
            } catch (error) {
                reject(error.sqlMessage);
            }
        })
    }

    recuperar(id: number): Promise<Empresa> {
        return new Promise(async (resolve, reject) => {
            let results: Array<Empresa>;
            let sql: string = SELECT;
            try {
                sql = this.incluirClausulaNoWhereAND(sql, ' Empresa.id = ? ');

                results = await this.conexao.query(sql, id);

                resolve(results[0]);
            } catch(error) {
                reject(error.sqlMessage);
            }
        })
    }

    novo(empresa: Empresa): Promise<Empresa> {
        return new Promise(async (resolve, reject) => {
            let results: any;
            const parametros = [];
            try {
                parametros.push(empresa.codigo);
                parametros.push(empresa.proprietario);
                parametros.push(empresa.cpfCnpj);
                parametros.push(empresa.nomeEmpresarial);
                parametros.push(empresa.nomeFantasia);

                results = await this.conexao.query(INSERT, parametros);
                empresa.id = results.insertId;

                resolve(empresa);
            } catch(error) {
                reject(error.sqlMessage);
            }
        })
    }
    
    atualizar(empresa: Empresa): Promise<Empresa> {
        return new Promise(async (resolve, reject) => {
            const parametros = [];
            try {
                parametros.push(empresa.codigo);
                parametros.push(empresa.proprietario);
                parametros.push(empresa.cpfCnpj);
                parametros.push(empresa.nomeEmpresarial);
                parametros.push(empresa.nomeFantasia);
                parametros.push(empresa.id)

                await this.conexao.query(UPDATE, parametros);
                resolve(empresa);
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

export default EmpresaPersistence;