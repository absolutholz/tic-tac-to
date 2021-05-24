import React from 'react';

import PubNub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';

import Lobby from './../components/Lobby';

const username = PubNub.generateUUID();

const pubnub = new PubNub({
	publishKey: process.env.REACT_APP_PUBNUB_PUBLISH_KEY,
	subscribeKey: process.env.REACT_APP_PUBNUB_SUBSCRIBE_KEY,
	uuid: username,
});

const DifferentDevices = () => {
	return (
		<PubNubProvider client={pubnub}>
			<Lobby username={username} />
		</PubNubProvider>
	);
};

export default DifferentDevices;
