import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import PubNub from 'pubnub';
// import { PubNubProvider } from 'pubnub-react';
// import { nanoid } from 'nanoid';

import Home from './components/Home';
import DifferentDevices from './components/DifferentDevices';
import SameDevice from './components/SameDevice';

import './scss/global.scss'

// import Game from './components/Game';
// // import Chat from './components/Chat';
// import Lobby from './components/Lobby';

const App = () => {
	// const username = nanoid(10);

	// const pubnub = new PubNub({
	// 	publishKey: 'pub-c-e8a11eed-a965-40d5-82d3-041bb8bdf242',
	// 	subscribeKey: 'sub-c-0b67ec46-b48b-11eb-b2e5-0e040bede276',
	// 	uuid: username,
	// });

	// // // // const [lobbyChannel, setLobbyChannel] = useState(null);
	// // // // const [gameChannel, setGameChannel] = useState(null);
	// // // // const [roomId, setRoomId] = useState(null); // Unique id when player creates a room

	// // // const [ isPlaying, setIsPlaying ] = useState(false); // Set to true when 2 players are in a channel
	// // // const [ isRoomCreator, setIsRoomCreator ] = useState(false);

	// // const state = {
	// // 	piece: '', // X or O
	// // 	isPlaying: false, // Set to true when 2 players are in a channel
	// // 	isRoomCreator: false,
	// // 	isDisabled: false,
	// // 	myTurn: false,
	// // };

	// // let lobbyChannel = null; // Lobby channel
	// // let gameChannel = null; // Game channel
	// // let roomId = null; // Unique id when player creates a room
	// // // pubnub.init(this); // Initialize PubNub

	// // // Join a room channel
	// // const joinRoom = (value) => {
	// // 	roomId = value;
	// // 	lobbyChannel = `tictactoelobby--${roomId}`;

	// // 	// Check the number of people in the channel
	// // 	pubnub.hereNow({
	// // 		channels: [lobbyChannel],
	// // 	}).then((response) => {
	// // 		if (response.totalOccupancy < 2) {
	// // 			console.log('joined');
	// // 			pubnub.subscribe({
	// // 				channels: [lobbyChannel],
	// // 				withPresence: true
	// // 			});

	// // 			state.piece = 'O'; // Player O

	// // 			pubnub.publish({
	// // 				message: {
	// // 					notRoomCreator: true,
	// // 				},
	// // 				channel: lobbyChannel,
	// // 			});
	// // 		} else {
	// // 			alert('Game in progress. Try another room.');
	// // 		}
	// // 	}).catch((error) => {
	// // 		console.log(error);
	// // 	});
	// // };

	// // const onPressCreate = () => {
	// // 	// Create a random name for the channel
	// // 	roomId = nanoid(5);
	// // 	console.log(roomId);
	// // 	lobbyChannel = `tictactoelobby--${roomId}`; // Lobby channel name

	// // 	pubnub.subscribe({
	// // 		channels: [lobbyChannel],
	// // 		withPresence: true // Checks the number of people in the channel
	// // 	});

	// // 	pubnub.getMessage(lobbyChannel, (msg) => {
	// // 		console.log({lobbyChannel}, {msg});
	// // 		// Start the game once an opponent joins the channel
	// // 		if (msg.message.notRoomCreator) {
	// // 			// Create a different channel for the game
	// // 			gameChannel = `tictactoegame--${roomId}`;
	// // 			pubnub.subscribe({
	// // 				channels: [gameChannel]
	// // 			});
	// // 		}
	// // 	});

	// // 	alert(roomId);
	// // 	// state.piece = 'X';
	// // 	state.isRoomCreator = true;
	// // 	// state.isDisabled = true; // Disable the 'Create' button
	// // 	// state.myTurn = true; // Player X makes the 1st move
	// // };

	// // const onPressJoin = () => {
	// // 	const roomIdToJoin = prompt('Enter the room id', '');

	// // 	// Check if the user typed a value in the input field
	// // 	if (roomIdToJoin) {
	// // 		joinRoom(roomIdToJoin);
	// // 	}
	// // };

	// // // useEffect(() => {
	// // // 	// Check that the player is connected to a channel
	// // // 	console.log({lobbyChannel});

	// // // // 	if(lobbyChannel != null){
	// // // // 		console.log('lobbyChannel',{lobbyChannel});
	// // // // 	  pubnub.getMessage(lobbyChannel, (msg) => {
	// // // // 		// Start the game once an opponent joins the channel
	// // // // 		console.log('joined', msg);
	// // // // 		if(msg.message.notRoomCreator){
	// // // // 		  // Create a different channel for the game
	// // // // 		  gameChannel = `tictactoelobby--${roomId}`;
	// // // // 		  pubnub.subscribe({
	// // // // 			channels: [gameChannel]
	// // // // 		  });
	// // // // 		}
	// // // // 	  });
	// // // // 	}
	// // // });

	return (
		// <PubNubProvider client={pubnub}>
			<Router>
				<main>
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/local" component={SameDevice} />
						<Route path="/remote" component={DifferentDevices} />
					</Switch>


					{/* <Lobby username={username} />

					<Game />

					<Chat /> */}
				</main>
			</Router>
		// </PubNubProvider>
	);
};

export default App;


// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
