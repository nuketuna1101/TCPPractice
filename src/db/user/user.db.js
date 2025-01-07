//====================================================================================================================
//====================================================================================================================
// user.db.js
// pools 객체에 있는 USER_DB의 커넥션 풀을 통해 쿼리를 전송
// uuid 라이브러리를 통해 id를 생성
//====================================================================================================================
//====================================================================================================================

import { v4 as uuidv4 } from 'uuid';
import pools from '../database.js';
import { SQL_QUERIES } from './user.queries.js';
import { toCamelCase } from '../../utils/transformCase.js';

export const findUserByDeviceID = async (deviceId) => {
    const [rows] = await pools.USER_DB.query(SQL_QUERIES.FIND_USER_BY_DEVICE_ID, [deviceId]);
    return toCamelCase(rows[0]);
};

export const createUser = async (deviceId) => {
    const id = uuidv4();
    await pools.USER_DB.query(SQL_QUERIES.CREATE_USER, [id, deviceId]);
    return { id, deviceId };
};

export const updateUserLogin = async (id) => {
    await pools.USER_DB.query(SQL_QUERIES.UPDATE_USER_LOGIN, [id]);
};
