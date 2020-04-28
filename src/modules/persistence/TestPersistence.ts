import PersistenceUtils from '../../utils/PersistenceUtils';
const config = require('../../config/config')();

const SELECT_TRUNCATES: string = `SELECT CONCAT('TRUNCATE TABLE ',table_schema,'.',TABLE_NAME, ';') AS 'sql' FROM INFORMATION_SCHEMA.TABLES WHERE table_schema in ('${config.dataBase}');`;
const KEYS_OFF: string = `SET FOREIGN_KEY_CHECKS = 0;`;
const KEYS_ON: string = `SET FOREIGN_KEY_CHECKS = 1;`;

class TestPersistence extends PersistenceUtils {

    private conexao: any;

    constructor(conexao: any) {
        super();
        this.conexao = conexao;
    }

    limparSchema(): Promise<any>  {
        return new Promise(async (resolve, reject) => {
            var truncates = await this.conexao.query(SELECT_TRUNCATES)

            if(truncates.length > 0) {
                await this.conexao.query(`${KEYS_OFF} ${truncates.map((sql: any) => sql.sql).join('')} ${KEYS_ON}`);
            }

            resolve();
        });
    }
}

export default TestPersistence;