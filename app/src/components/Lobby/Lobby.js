import React, { useState } from 'react';

import { usePubNub } from 'pubnub-react';
import { nanoid } from 'nanoid';

import ButtonList from './../ButtonList';

const Lobby = ({ username }) => {
	// const [lobbyChannel, setLobbyChannel] = useState(null);
	let roomId = null;
	let lobbyChannel = null;
	let gameChannel = null;

	// const [players, setPlayers] = useState([]);
	let piece = '';
	// const [isPlaying, setIsPlaying] = useState(false);
	// const [isDisabled, setIsDisabled] = useState(false);
	const [isRoomCreator, setIsRoomCreator] = useState(false);
	const [isWaitingForOpponent, setIsWaitingForOpponent] = useState(false);
	const [shareableRoomId, setShareableRoomId] = useState('');

	const pubnub = usePubNub();

	const listen = () => {
		pubnub.addListener({
			message: (msg) => {
				console.log({ msg });
				// Start the game once an opponent joins the channel
				if (msg.message.notRoomCreator) {
					alert(`Ready to start the game as \r\n Player ${ piece }`);
					// Create a different channel for the game
					gameChannel = `tictactoegame--${this.roomId}`;
					pubnub.subscribe({
						channels: [gameChannel]
					});
				}
			}
		});

		pubnub.subscribe({
			channels: [lobbyChannel],
			withPresence: true, // Checks the number of people in the channel
		});
	};

	// Create a room channel
	const onPressCreate = (event) => {
		// Create a random name for the channel
		roomId = nanoid(5);
		lobbyChannel = `tictactoelobby--${roomId}`; // Lobby channel name
		setShareableRoomId(roomId);

		setIsWaitingForOpponent(true);
		setIsRoomCreator(true);
		piece = 'X';

		listen();

		// setPlayers([
		// 	{
		// 		uuid: username,
		// 	}
		// ]);
	};

	// Join a room channel
	const onPressJoin = (event) => {
		const roomIdToJoin = prompt('Enter the room id', '');

		// Check if the user typed a value in the input field
		if (roomIdToJoin) {
			roomId = roomIdToJoin;
			lobbyChannel = `tictactoelobby--${roomId}`;
			// Check the number of people in the channel
			pubnub.hereNow({
				channels: [lobbyChannel],
			}).then((response) => {
				if (response.totalOccupancy < 2) {
					// setPlayers([...response.channels[lobbyChannel].occupants,
					// {
					// 	uuid: username,
					// }
					// ]);
					listen();

					piece = 'O';

					pubnub.publish({
						message: {
							notRoomCreator: true,
						},
						channel: lobbyChannel,
					});
				} else {
					// Game in progress
					alert('Game in progress. Try another room.');
				}
			}).catch((error) => {
				console.log(error);
			});
		}
	};

	const shareLobbyRoomId = () => {
		if (navigator.share) {
			navigator.share({
				text: shareableRoomId,
			});
		} else {
			alert(`Share this room ID with your friend\r\n${shareableRoomId}`);
		}
	};

	// pubnub.addListener({
	// 	presence: (eventPresence) => {
	// 	  console.log(eventPresence);
	// 	}
	// });

	// pubnub.subscribe({
	// 	channels: [lobbyChannel],
	// 	withPresence: true // Checks the number of people in the channel
	// });

	// pubnub.hereNow(
	// 	{
	// 		channels: [lobbyChannel],
	// 		includeState: true
	// 	},
	// 	function (status, response) {
	// 		console.log(status, response);
	// 		setPlayers(response.channels[lobbyChannel].occupants);
	// 	}
	// );

	return (
		<div className="lobby">

			{ !isWaitingForOpponent &&
				<ButtonList>
					<button
						className="button"
						onClick={() => onPressCreate()}
					>
						Create a game
					</button>
					<button
						className="button"
						onClick={() => onPressJoin()}
					>
						Join a game
					</button>
				</ButtonList>
			}

			{ isWaitingForOpponent &&
				<div>
					<p>Share this code with your friend <span>{ shareableRoomId }</span>
					</p>
					<ButtonList>
						<button
							className="button"
							onClick={() => onPressCreate()}
						>
							Create a game
						</button>
						<button
							className="button"
							onClick={() => onPressJoin()}
						>
							Join a game
						</button>
					</ButtonList>
				</div>
			}






			{/* { !isWaitingForPlayers &&
				<div>
					You are Player { piece }
					<button
					>
						Start game
					</button>
				</div>
			} */}

			{/* { shareableRoomId &&
				<section>
					<h2>Share this code with your opponent</h2>
					<button
						onClick={ shareLobbyRoomId }
					>
						{ shareableRoomId }
					</button>
				</section>
			} */}

			{/* <section>
				<h2>Players</h2>
				<div>User: {username}</div>
				<ol>
					{
						players.map((player) => <li key={player.uuid}>{player.uuid}</li>)
					}
				</ol>
			</section> */}
		</div>
	);
};

export default Lobby;
// import React from 'react';
// import { usePubNub } from 'pubnub-react';
// import { nanoid } from 'nanoid';

// const Lobby = () => {
// 	const pubnub = usePubNub();

// 	let lobbyChannel = null;
// 	let roomId = null; // Unique id when player creates a room
// 	let isRoomCreator = false;
// 	let piece = '';

// 	const onPressCreate = () => {
// 		// Create a random name for the channel
// 		roomId = nanoid(5);
// 		lobbyChannel = `tictactoelobby--${roomId}`; // Lobby channel name
// 		console.log('created', { roomId, lobbyChannel });

// 		pubnub.publish({
// 			message: {
// 				player: {
// 					name: 'Player X',
// 				},
// 				notRoomCreator: false,
// 			},
// 			channel: lobbyChannel,
// 		});

// 		pubnub.subscribe({
// 			channels: [lobbyChannel],
// 			withPresence: true // Checks the number of people in the channel
// 		});

// 		pubnub.addListener({
// 			message: (message) => {
// 				console.log({message});
// 			},
// 		});

// 		pubnub.hereNow(
// 			{
// 			  channels: [lobbyChannel],
// 			  includeState: true
// 			},
// 			function (status, response) {
// 			  console.log({status, response});
// 			}
// 		);

// 		alert(roomId);
// 		isRoomCreator = true;
// 		piece = 'X';
// 		// state.isDisabled = true; // Disable the 'Create' button
// 		// state.myTurn = true; // Player X makes the 1st move
// 	};

// 	const onPressJoin = () => {
// 		const roomIdToJoin = prompt('Enter the room id', '');

// 		// Check if the user typed a value in the input field
// 		if (roomIdToJoin) {
// 			roomId = roomIdToJoin;
// 			lobbyChannel = `tictactoelobby--${roomId}`;

// 			// Check the number of people in the channel
// 			pubnub.hereNow({
// 				channels: [lobbyChannel],
// 			}).then((response) => {
// 				console.log('joining', {response});
// 				if (response.totalOccupancy < 2) {
// 					pubnub.subscribe({
// 						channels: [lobbyChannel],
// 						withPresence: true,
// 					});

// 					piece = 'O'; // Player O

// 					pubnub.publish({
// 						message: {
// 							player: {
// 								name: 'Player O',
// 							},
// 							notRoomCreator: true,
// 						},
// 						channel: lobbyChannel,
// 					});
// 				} else {
// 					alert('Game in progress. Try another room.');
// 				}
// 			}).catch((error) => {
// 				console.log(error);
// 			});
// 		}
// 	};

// 	return (
// 		<div className="lobby">
// 			<button
// 				className="create-button "
// 				// disabled={state.isDisabled}
// 				onClick={() => onPressCreate()}
// 			>
// 				Create
// 		</button>
// 			<button
// 				className="join-button"
// 				onClick={() => onPressJoin()}
// 			>
// 				Join
// 		</button>
// 		</div>

// 	);
// };

// export default Lobby;
