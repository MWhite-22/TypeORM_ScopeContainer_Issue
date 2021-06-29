export const ENV = {
	NODE_ENV: process.env.NODE_ENV || 'development',
	PROD: process.env.NODE_ENV === 'production',
	PORT: parseInt(process.env.PORT || '4000'),
	FRONTEND: {
		URL: process.env.FRONTEND_URL || 'http://localhost:3000',
	},
	POSTGRES: {
		URL: process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/Test_dev',
	},
};
