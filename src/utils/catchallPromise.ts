export const catchall_promise = () => {
	process.on('unhandledRejection', (error, promise) => {
		console.log('Forgot to handle a promise rejection here: ', promise);
		console.log('The error was: ', error);
	});
};
