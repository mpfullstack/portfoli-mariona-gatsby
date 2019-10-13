import React, { useState, useEffect } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import throttle from 'lodash.throttle';
import theme from '../../theme';

const NavigatorWrapper = styled.div`
  width: 15px;
  height: 68vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
`;

const NavigatorItemWrapper = styled.div`
  width: 130px;
  transform: rotate(-90deg);
  transition: transform .6s ease;
  &.selected,
  &.others {
    transform: rotate(-90deg) translate(-100px, 0);
  }
  &:first-child {
    transform: rotate(-90deg) translate(0, 0);
  }
`;

const NavigatorItem = styled.div`
  border: 3px solid ${theme.navigatorItemColor};
  box-sizing: border-box;
  border-radius: 100%;
  width: 15px;
  height: 15px;
  margin: 5px;
  cursor: pointer;
  &.selected,
  &:hover {
    border: 3px solid ${theme.selectedNavigatorItemColor};
    background-color: ${theme.selectedNavigatorItemColor};
  }
  display: inline-block;
`;

const NavigatorItemTitle = styled.span`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
  letter-spacing: 0.15em;
  line-height: 24px;
  color: ${theme.textColor};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  animation-delay: .6s;
  animation-durcation: 2s;
`;

function addMouseWheelEventListener(scrollHandler) {
  if (!window.__mouseWheelEventEnabled) {
    if (window.addEventListener) {
      // IE9+, Chrome, Safari, Opera
      window.addEventListener("mousewheel", scrollHandler, false);
      // Firefox
      window.addEventListener("DOMMouseScroll", scrollHandler, false);
      // window.addEventListener("scroll", scrollHandler, false);
    } else {
      // // IE 6/7/8
      window.attachEvent("onmousewheel", scrollHandler);
    }
    window.__mouseWheelEventEnabled = true;
  }
}

const scrollToSelectedProject = selectedItem => {
  // Scroll to selected project
  if (selectedItem === 0) {
    window.scroll({ top: 0, behavior: 'smooth' });
  } else {
    let projectItem = document.getElementById(`project-item-${selectedItem}`);
    if (projectItem) {
      projectItem.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }
}

const Navigator = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState(0); // Item index or item hash from URL

  // useEffect scroll to selected project
  useEffect(() => {
    if (document.getElementById('span_navigator')) {
      // Scroll to selected project
      scrollToSelectedProject(selectedItem);
    }
  });

  // useEffect hook to handle scroll mouse wheel
  useEffect(() => {
    let isScrolling;
    let isAnimating = false;

    // Function to handle a mouse wheel scroll event
    const scrollHandler = event => throttle(() => {
      let direction;
      // cross-browser wheel delta
      // Chrome / IE: both are set to the same thing - WheelEvent for Chrome, MouseWheelEvent for IE
      // Firefox: first one is undefined, second one is MouseScrollEvent
      let e = window.event || event;
      // Chrome / IE: first one is +/-120 (positive on mouse up), second one is zero
      // Firefox: first one is undefined, second one is -/+3 (negative on mouse up)
      var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
      if (delta > 0) {
        direction = 'UP';
      } else {
        direction = 'DOWN';
      }
      // If item animation is not being done
      if (!isAnimating) {
        isAnimating = true;
        // Clear our timeout throughout the scroll
    		clearTimeout(isScrolling);
        // Set a timeout to run after scrolling ends
    		isScrolling = setTimeout(() => {
          // Let the animation of item visulization finish before letting scroll to next or previous item
          setTimeout(() => isAnimating = false, direction === 'DOWN' ? 500 : 250);
          // Set selected item to state based on mouse wheel direction
          setSelectedItem(selectedItem => {
            if (direction === 'UP') {
              if (selectedItem === 0) {
                return selectedItem;
              } else {
                return selectedItem - 1;
              }
            } else {
              if (selectedItem === items.length-1) {
                return selectedItem;
              } else {
                return selectedItem + 1;
              }
            }
          });
    		}, 125);
      }
    }, 50)();

    // Add mouse wheel event listener
    addMouseWheelEventListener(scrollHandler);

    // Return function to remove event listeners and disable window.__mouseWheelEventEnabled
    return () => {
      window.removeEventListener("mousewheel", scrollHandler, false);
      window.removeEventListener("DOMMouseScroll", scrollHandler, false);
      window.__mouseWheelEventEnabled = false
    };
  }, []);

  // useEffect to enable smooth scroll polyfill only once
  useEffect(() => {
    if (!window.__smoothScrollEnabled) {
      smoothscroll.polyfill();
      window.__smoothScrollEnabled = true;
    }
    return () => {
      window.__smoothScrollEnabled = false
    };
  }, []);

  let permamentClassNames;
  return (
    <NavigatorWrapper>
      {
        items.map(({ node }, i) => {
          const itemClassNames = [];
          if (permamentClassNames) {
            itemClassNames.push(permamentClassNames);
          }
          if (i === selectedItem) {
            itemClassNames.push('selected');
            if (i !== 0) {
              permamentClassNames = 'others';
            }
          }
          return (
            <NavigatorItemWrapper key={node.id} className={itemClassNames.join(' ')} style={{zIndex: 1000-i}}>
              <NavigatorItem className={itemClassNames.join(' ')} onClick={() => setSelectedItem(i)} />
              {i === selectedItem ?
                <NavigatorItemTitle id='span_navigator' className='selected animated fadeIn'>
                  {node.title}
                </NavigatorItemTitle>
                :
                null
              }
            </NavigatorItemWrapper>
          );
        })
      }
    </NavigatorWrapper>
  );
}

Navigator.propTypes = {
  items: PropTypes.array
}

export default Navigator;
