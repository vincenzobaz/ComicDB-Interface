export const activateInsertPanel = (tableName) => {
	return {
		type: 'INSERT_ACTIVATE_PANEL',
		panel: tableName
	};
};

