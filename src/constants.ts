export const ENV = {
	NODE_ENV: process.env.NODE_ENV || 'development',
	PROD: process.env.NODE_ENV === 'production',
	PORT: parseInt(process.env.PORT || '4000'),
	FRONTEND: {
		URL: process.env.FRONTEND_URL || 'http://localhost:3000',
	},
	POSTGRES: {
		URL: process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/MXA_Force_Dev',
	},
	REDIS: {
		URL: process.env.REDIS_URL || 'redis://localhost:6379/0',
	},
	SESSION: {
		ID: process.env.SESSION_ID || 'SessID',
		SECRET: process.env.SESSION_SECRET,
		MAX_AGE: 1_000 * 60 * 15 * (process.env.NODE_ENV === 'production' ? 1 : 96), //PROD: 15 Minute | DEV: 24 Hours
	},
	EMAIL: {
		HOST: process.env.EMAIL_HOST ?? undefined,
		SERVICE: process.env.EMAIL_SERVICE ?? undefined,
		USER: process.env.EMAIL_USERNAME,
		PASSWORD: process.env.EMAIL_PASSWORD,
	},
};

export const REDIS_PREFIX = {
	SESSION: {
		ACTIVE_SESSIONS: 'ActiveSessions:',
		USER_SESSION_LIST: 'UserSessionList:',
	},
	LOGIN: {
		WRONG_PASSWORD: 'WrongPasswordAttempts:',
	},
	EMAIL_LINKS: {
		CONFIRM_ACCOUNT: 'UserConfirmPassword:',
		FORGOT_PASSWORD: 'ForgotPasswordLinks:',
	},
	ONLINE_USERS: 'ONLINE_USERS:',
};
