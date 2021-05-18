import React from 'react';

import './Square.scss';

import { ReactComponent as SvgX } from '@mdi/svg/svg/alpha-x.svg';
import { ReactComponent as SvgO } from '@mdi/svg/svg/alpha-o.svg';
// import { ReactComponent as SvgO } from '@mdi/svg/svg/numeric-0.svg';

const Square = ({ value, onClick }) => {
	let icon = value;
	if (value === 'X') {
		icon = <SvgX />
	} else if (value === 'O') {
		icon = <SvgO />
	}

	return (
		<button
			className="square"
			onClick={onClick}
		>
			{ icon }
		</button>
	);
};

export default Square;
