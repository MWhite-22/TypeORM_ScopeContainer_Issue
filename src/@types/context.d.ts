import DataLoader from 'dataloader';
import { Request, Response } from 'express';
import { Session } from 'express-session';
import { Redis } from 'ioredis';

declare global {
	interface CTX {
		requestId: string;
		req: Request;
		res: Response;
		session: Session & { data?: MySessionData };
		loaders: createEntityLoaders;
	}

	interface MySessionData {
		currentUser: {
			id: string;
			email_personal: string;
		};
		activeCompanyProfile: {
			id: string;
			email_company: string;
			company: {
				id: string;
				isAdminCompany: boolean;
			};
		};
	}
}
