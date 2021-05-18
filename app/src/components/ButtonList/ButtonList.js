import React from 'react';

import './ButtonList.scss';

const ButtonList = ({ children }) => {
	return (
		<div className="button-list">
			{ children }
		</div>
	);
};

export default ButtonList;
