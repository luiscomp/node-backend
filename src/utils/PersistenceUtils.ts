class PersistenceUtils {

    incluirFiltros(sql: string, obj: any, tabela: string) {
        Object.keys(obj).map(attr => {
            if(obj[attr] !== null && obj[attr] !== undefined && !(typeof obj[attr] === 'object')) {
                sql = this.incluirClausulaNoWhereAND(sql, `${tabela}.${attr} = ?`);
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

    incluirCampoNoUpdate(sqlQuery: string, campo: string, valor: any): string {
        let query = sqlQuery.toUpperCase();
        query = this.insert(query, query.lastIndexOf('WHERE'), `, ${campo} = ${valor} `)
        return sqlQuery;
    }

    insert(str: string, index: number, value: string) {
        return str.substr(0, index) + value + str.substr(index);
    }
}

export default PersistenceUtils;