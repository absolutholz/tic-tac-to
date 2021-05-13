import './button.scss';

export default {
	title: 'Semantics/Button',
};

export const Button = ((args) => <button>{ args.content }</button>).bind({});
Button.args = {
	content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
};

export const Hover = ((args) => <button>{ args.content }</button>).bind({});
Hover.args = {
	content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
};
Hover.parameters = {
	pseudo: {
		hover: true,
	}
};
