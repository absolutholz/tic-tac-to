import React from 'react';

import Square from './Square';

const style = {
	border: '4px solid darkblue',
	borderRadius: '10px',
	display: 'grid',
	gridTemplate: 'repeat(3, 1fr) / repeat(3, 1fr)',
	height: '250px',
	margin: '0 auto',
	width: '250px',
};

const Board = ({ squares, onClick }) => (
	<div style={ style }>
		{ squares.map((square, i) => (
			<Square key={ i } onClick={ () => onClick(i) } value={ square } />
		))}
	</div>
);

export default Board;
