import React from 'react';

import Square from '../Square';

const styleGrid = {
	background: 'black',
	display: 'grid',
	gridGap: '2px',
	gridTemplate: 'repeat(3, 1fr) / repeat(3, 1fr)',
	height: '250px',
	listStyle: 'none',
	margin: '0 auto',
	paddingLeft: '0',
	width: '250px',
};

const styleGridItem = {
	background: '#fff',
};

const Board = ({ squares, onClick }) => (
	<ol style={ styleGrid }>
		{ squares.map((square, i) => (
			<li key={ i } style={ styleGridItem }>
				<Square onClick={ () => onClick(i) } value={ square } />
			</li>
		))}
	</ol>
);

export default Board;
