
export const fetchTableListReceived = (tableList) => {
	return {
		type: 'FETCH_TABLE_LIST_RECEIVED',
		list: tableList
	};
};

export const fetchTableListRequest = () => {
	return {type: 'FETCH_TABLE_LIST_REQUEST'};
};


