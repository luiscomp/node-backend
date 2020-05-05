/* eslint-disable @typescript-eslint/no-unused-vars */
import * as mocha from 'mocha';
import * as chai from 'chai';
import * as chaiAsPromisse from 'chai-as-promised';
import * as td from 'testdouble';
import * as supertest from 'supertest';
import App from '../../../src/core/api/api';
import PoolFactory from '../../../src/core/db/PoolFactory';

chai.use(chaiAsPromisse)

const app = App;
const request = supertest;
const expect = chai.expect;
const testDouble = td;
const conexao = new PoolFactory().getPool();

export { app, expect, request, testDouble, conexao };