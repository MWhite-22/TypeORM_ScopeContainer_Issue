import { CoreEntity } from 'src/models/_core/entity.core';
import { ClassType } from 'type-graphql';

export type Lazy<T> = T | Promise<T>;

export type ExtractPrimitiveFieldNames<T> = {
	[K in keyof T]: T[K] extends Function | Promise<any> | CoreEntity ? never : K;
}[keyof T];

export type ExtractPrimitiveFields<T> = Pick<T, ExtractPrimitiveFieldNames<T>>;

export type InputClass<T> = Omit<ExtractPrimitiveFields<T>, keyof CoreEntity>;

export type SeedInputClass<T> = InputClass<T> & Pick<CoreEntity, 'created_byId'>;
