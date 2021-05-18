import React from 'react';
import { Link } from "react-router-dom";

import './Button.scss';

const Button = ({ children, to, href }) => {
	let element = <Button className="button">{ children }</Button>;
	if (to) {
		element = <Link className="button" to={ to }>{ children }</Link>
	} else if (href) {
		element = <a className="button" href={ href }>{ children }</a>
	}

	return element;
};

export default Button;
