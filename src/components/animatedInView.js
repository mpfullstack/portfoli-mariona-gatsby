import React from "react";
import PropTypes from "prop-types"
import useInView from 'use-in-view';
import { Animated } from "react-animated-css";

// NOTE: We are imporing it in layout/index.js
// import 'animate.css';

const AnimatedInView = ({ children, offset, animationIn, ...otherOptions }) => {
	const [ref, inView] = useInView(offset);

	return (
    <div className={inView ? 'in-view' : ''} ref={ref}>
      {
        inView
        &&
        <Animated animationIn={animationIn} {...otherOptions}>
          {children}
        </Animated>
      }
    </div>
	);
};

AnimatedInView.defaultProps = {
  animationIn: 'fadeIn',
  offset: 500
}

AnimatedInView.propTypes = {
  animationIn: PropTypes.string,
  offset: PropTypes.number
}

export default AnimatedInView;
