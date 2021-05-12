import React from 'react';

import { ReactComponent as SvgX } from '@mdi/svg/svg/alpha-x.svg';
import { ReactComponent as SvgO } from '@mdi/svg/svg/alpha-o.svg';
// import { ReactComponent as SvgO } from '@mdi/svg/svg/numeric-0.svg';

const style = {
	alignItems: 'center',
	background: 'lightblue',
	border: '2px solid darkblue',
	display: 'flex',
	fontSize: '2rem',
	fontWeight: 'bold',
	justifyContent: 'center',
	outline: 'none',
	padding: 0,
};

const iconStyle = {
	height: '100%',
	width: '100%',
};

const Square = ({ value, onClick }) => {
	console.log(value);

	let icon = value;
	if (value === 'X') {
		icon = <SvgX style={iconStyle} />
	} else if (value === 'O') {
		icon = <SvgO style={iconStyle} />
	}

	return (
		<button
			onClick={onClick}
			style={style}
		>
			{ icon}
		</button>
	);
};

export default Square;
