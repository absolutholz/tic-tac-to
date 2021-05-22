import React, { useState, useEffect } from 'react';

import { usePubNub } from 'pubnub-react';

import './RemoteGame.scss';

import Board from '../Board';
import { calculateWinner } from '../../helpers';

const RemoteGame = ({ gameChannel, piece }) => {
	const pubnub = usePubNub();

	const [moves, setMoves] = useState(Array(9).fill(null));
	const [xIsNext, setXisNext] = useState(true);
	const winner = calculateWinner(moves);

	const handleClick = (i) => {
		if (xIsNext && piece === 'X' || !xIsNext && piece === 'O') {
			const extendedMoves = [...moves];
			extendedMoves[i] = piece;

			pubnub.publish({
				message: {
					clickPosition: i,
					clickPiece: xIsNext ? 'X' : 'O',
					moves: extendedMoves,
				},
				channel: gameChannel,
			});
		}
	};

	useEffect(() => {
		console.log({gameChannel});
		pubnub.subscribe({
			channels: [gameChannel],
		});

		pubnub.addListener({
			message: (msg) => {
				// mark(msg.message);
				setMoves(msg.message.moves);
				setXisNext(msg.message.clickPiece !== 'X');
			}
		});
	}, []);

	return (
		<>
			<div>You are player { piece }</div>
			<Board squares={moves} onClick={handleClick} />
			<div className="game">
				<p>{winner ? `Winner: ${winner}` : `Next Player: ${(xIsNext ? 'X' : 'O')}`}</p>
			</div>
		</>
	)
};

export default RemoteGame;
