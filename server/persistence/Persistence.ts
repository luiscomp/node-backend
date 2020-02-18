var util = require('util');
var mysql = require('mysql');
var config = require('../config/config')();

class Persistence {
    conexao() {
        var poolDeConexao = mysql.createPool({
            host                : config.dbHost,
            port                : config.dbPort,
            user                : config.dbUser,
            password            : config.dbPassword,
            database            : config.dataBase,
            connectionLimit     : 5,
            multipleStatements  : true
        });
        
        poolDeConexao.getConnection((error, connection) => {
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
            if(connection) {
                connection.release();
            }
            return;
        })
        
        poolDeConexao.query = util.promisify(poolDeConexao.query);

        return poolDeConexao;
    }

    incluirFiltros(sql: string, obj: any) {
        Object.keys(obj).map(attr => {
            if(obj[attr] !== null && obj[attr] !== undefined) {
                sql = this.incluirClausulaNoWhereAND(sql, `${attr} = ?`);
            }
        });

        return sql;
    }

    montarParametros(obj: any) {
        let parametros: Array<any> = new Array<any>();

        Object.keys(obj).map(attr => {
            if(obj[attr] !== null && obj[attr] !== undefined) {
                parametros.push(obj[attr]);
            }
        });

        return parametros;
    }

    incluirClausulaNoWhereAND(sqlQuery: string, clausula: string): string {
        if(sqlQuery.toUpperCase().lastIndexOf('WHERE') > sqlQuery.toUpperCase().lastIndexOf('FROM')) {
            sqlQuery = sqlQuery.concat(' AND (', clausula, ' ) ');
        } else {
            sqlQuery = sqlQuery.concat(' WHERE (', clausula, ') ');
        }
        return sqlQuery;
    }


    incluirClausulaNoWhereOR(sqlQuery: string, clausula: string): string {
        if(sqlQuery.toUpperCase().lastIndexOf('WHERE') > sqlQuery.toUpperCase().lastIndexOf('FROM')) {
            sqlQuery = sqlQuery.concat(' OR (', clausula, ' ) ');
        } else {
            sqlQuery = sqlQuery.concat(' WHERE (', clausula, ') ');
        }
        return sqlQuery;
    }
}

export default Persistence;