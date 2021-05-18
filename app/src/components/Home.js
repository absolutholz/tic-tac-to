import React from 'react';
import { Link } from "react-router-dom";

import Button from './../components/Button';
import ButtonList from './../components/ButtonList';

const Home = () => {
	return (
		<div>
			<h1>Tic Tac Toe</h1>

			<p>How would you like to play?</p>

			<ButtonList>
				<Button to="/local">Share this device</Button>
				<Button to="/remote">On separate devices</Button>
			</ButtonList>
		</div>
	);
};

export default Home;
