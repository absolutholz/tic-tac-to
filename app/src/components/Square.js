import React from 'react';

const style = {
	background: 'lightblue',
	border: '2px solid darkblue',
	fontSize: '2rem',
	fontWeight: 'bold',
	cursor: 'pointer',
	outline: 'none',
};

const Square = ({ value, onClick }) => (
	<button
		onClick={ onClick }
		style={ style }
	>
		{ value }
	</button>
);

export default Square;
