import React from 'react';

import './Board.scss';

import Square from '../Square';

const styleGridItem = {
	background: '#fff',
};

const Board = ({ squares, onClick }) => (
	<ol className="board">
		{ squares.map((square, i) => (
			<li key={ i } style={ styleGridItem }>
				<Square onClick={ () => onClick(i) } value={ square } />
			</li>
		))}
	</ol>
);

export default Board;
