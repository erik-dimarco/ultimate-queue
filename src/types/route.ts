import { Schema } from 'joi';

export type HttpMethod = 'get' | 'put' | 'post' | 'delete' | 'patch';
export interface ISchema {
	params?: Schema;
	query?: Schema;
	body?: Schema;
}

export interface IRoute {
	method: HttpMethod;
	path: string;
	bodyParser?: any;
	schema?: ISchema;
	controller: () => any;
}
