const util = require('util');
const mysql = require('mysql');
const config = require('../../config/config')();

class PoolFactory {

    getPool(): any {

        const poolDeConexao = mysql.createPool({
            host                : config.dbHost,
            port                : config.dbPort,
            user                : config.dbUser,
            password            : config.dbPassword,
            database            : config.dataBase,
            connectionLimit     : 5,
            multipleStatements  : true
        });

        // poolDeConexao.on('acquire', function (connection: { threadId: any }) {
        //     console.log('Connection %d acquired', connection.threadId);
        // });

        // poolDeConexao.on('release', function (connection: { threadId: any }) {
        //     console.log('Connection %d released', connection.threadId);
        // });

        process.on('SIGINT', () => 
            poolDeConexao.end((err: any) => {
                if(err) return console.log(err);
                console.log('poolDeConexao => fechado');
                process.exit(0);
            })
        );
        
        poolDeConexao.getConnection((error: { code: string }, connection: { release: () => void }) => {
            if(error) {
                if(error.code === 'PROTOCOL_CONNECTION_LOST') {
                    throw new Error('Database connection was closed.')
                }
                if(error.code === 'ER_CON_COUNT_ERROR') {
                    throw new Error('Database has too many connections.')
                }
                if(error.code === 'ECONNREFUSED') {
                    throw new Error('Database connection was refused.')
                }
            }
            if(connection) {
                connection.release();
            }
            return;
        })
        
        poolDeConexao.query = util.promisify(poolDeConexao.query);

        return poolDeConexao;
    }
}

export default PoolFactory;

