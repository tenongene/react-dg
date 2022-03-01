const apiRequest = async (url = '', optionsObj = null, errMsg = null) => {
	try {
		const response = await fetch(url, optionsObj); // optionsObj is what makes this a read/update request vs create
		if (!response.ok) throw Error('Please reload the app..');
	} catch (error) {
		errMsg = error.message;
	} finally {
		return errMsg;
	}
};

export default apiRequest;
