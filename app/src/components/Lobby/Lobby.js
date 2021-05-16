import React, { useState } from 'react';
import { usePubNub } from 'pubnub-react';
import { nanoid } from 'nanoid';

const Lobby = ({ username }) => {
	// const [lobbyChannel, setLobbyChannel] = useState(null);
	let roomId = null;
	let lobbyChannel = null;
	let gameChannel = null;

	const [players, setPlayers] = useState([]);
	const [isRoomCreator, setIsRoomCreator] = useState(false);

	const pubnub = usePubNub();

	const listen = () => {
		pubnub.addListener({
			message: (msg) => {
				console.log({ msg });
				// Start the game once an opponent joins the channel
				if (msg.message.notRoomCreator) {
					console.log('start the game');
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

	// Join a room channel
	const joinRoom = (roomIdToJoin) => {
		roomId = roomIdToJoin;
		lobbyChannel = `tictactoelobby--${roomId}`;
		// setLobbyChannel(`tictactoelobby--${roomId}`, () => {
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
		// });
	};

	// Create a room channel
	const onPressCreate = (event) => {
		// Create a random name for the channel
		roomId = nanoid(5);
		// setLobbyChannel(`tictactoelobby--${roomId}`); // Lobby channel name
		lobbyChannel = `tictactoelobby--${roomId}`; // Lobby channel name
		alert(`Share this room ID with your friend\r\n${roomId}`);
		setIsRoomCreator(true);
		listen();
		// setPlayers([
		// 	{
		// 		uuid: username,
		// 	}
		// ]);
	};

	// The 'Join' button was pressed
	const onPressJoin = (event) => {
		const roomIdToJoin = prompt('Enter the room id', '');

		// Check if the user typed a value in the input field
		if (roomIdToJoin) {
			joinRoom(roomIdToJoin)
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
			<button
				className="create-button "
				// disabled={state.isDisabled}
				onClick={() => onPressCreate()}
			>
				Create
			</button>
			<button
				className="join-button"
				onClick={() => onPressJoin()}
			>
				Join
			</button>

			<section>
				<h2>Players</h2>
				<div>User: {username}</div>
				<ol>
					{
						players.map((player) => <li key={player.uuid}>{player.uuid}</li>)
					}
				</ol>
			</section>
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
