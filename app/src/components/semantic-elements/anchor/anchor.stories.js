import './anchor.scss';

export default {
	title: 'Semantics/Anchor',
};

export const Anchor = ((args) => <a href="#">{ args.content }</a>).bind({});
Anchor.args = {
	content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
};

export const Hover = ((args) => <a href="#">{ args.content }</a>).bind({});
Hover.args = {
	content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
};
Hover.parameters = {
	pseudo: {
		hover: true,
	}
};
