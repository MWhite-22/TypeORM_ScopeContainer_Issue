import { Request, Response } from 'express';
import { Redis } from 'ioredis';
import { ContainerInstance } from 'typedi';

declare global {
	interface CTX {
		requestId: string;
		req: Request;
		res: Response;
		scopedContainer: ContainerInstance;
	}
}
