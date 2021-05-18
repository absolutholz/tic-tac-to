import React from 'react';

import PubNub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';
import { nanoid } from 'nanoid';

import Lobby from './../components/Lobby';

const username = nanoid(10);

const pubnub = new PubNub({
	publishKey: 'pub-c-e8a11eed-a965-40d5-82d3-041bb8bdf242',
	subscribeKey: 'sub-c-0b67ec46-b48b-11eb-b2e5-0e040bede276',
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
