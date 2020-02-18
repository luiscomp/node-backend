import Persistence from './Persistence';

class TestPersistence extends Persistence {

    private SELECT_TRUNCATES: String = "SELECT Concat('TRUNCATE TABLE ',table_schema,'.',TABLE_NAME, ';') as 'sql' FROM INFORMATION_SCHEMA.TABLES where  table_schema in ('estudo_test')";
    private KEYS_OFF: String = "SET FOREIGN_KEY_CHECKS = 0";
    private KEYS_ON: String = "SET FOREIGN_KEY_CHECKS = 1";

    limparSchema(): Promise<any>  {
        return new Promise(async (resolve, reject) => {

            var truncates = await this.conexao().query(this.SELECT_TRUNCATES)

            // console.log(truncates);

            if(truncates.length > 0) {
                await this.conexao().query(this.KEYS_OFF);
                await truncates.forEach(async sql => {
                    await this.conexao().query(sql);
                });
                await this.conexao().query(this.KEYS_ON);
            }

            resolve();
        });
    }
}

export default new TestPersistence();