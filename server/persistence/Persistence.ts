import { PoolConfig, createPool, Pool, MysqlError, PoolConnection } from 'mysql';
import * as util from 'util';

class Persistence {
    
    private poolConfig: PoolConfig;
    private poolDeConexao;

    constructor() {
        this.poolConfig = this.montarPool();
        this.poolDeConexao = createPool(this.poolConfig);
        this.prepararConexao();
    }

    montarPool(): PoolConfig {
        let pool: PoolConfig;

        pool.host                = "glassfish40dev.tre-pi.gov.br",
        pool.port                = 3306,
        pool.user                = "sedesc",
        pool.password            = "secreto9",
        pool.database            = "gestcom_trepi",
        pool.connectionLimit     = 5,
        pool.multipleStatements  = true

        return pool;
    }

    prepararConexao() {
        this.conexao().getConnection((error: MysqlError, connection: PoolConnection) => {
            if(error) {
                if(error.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.');
                }
                if(error.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.');
                }
                if(error.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused.');
                }
            }
            if(connection) connection.release();
            return;
        });

        this.poolDeConexao.query = util.promisify(this.poolDeConexao.query);
    }

    conexao() {
        return this.poolDeConexao;
    }

}

export default new Persistence();