import './headline.scss';

export default {
	title: 'Semantics/Headline',
};

const CONTENT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

export const H1 = ((args) => <h1>{ args.content }</h1>).bind({});
H1.args = {
  content: CONTENT,
};

export const H2 = ((args) => <h2>{ args.content }</h2>).bind({});
H2.args = {
  content: CONTENT,
};

export const H3 = ((args) => <h3>{ args.content }</h3>).bind({});
H3.args = {
  content: CONTENT,
};

export const H4 = ((args) => <h4>{ args.content }</h4>).bind({});
H4.args = {
  content: CONTENT,
};

export const H5 = ((args) => <h5>{ args.content }</h5>).bind({});
H5.args = {
  content: CONTENT,
};
