import React, { useState, useEffect, useContext } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import throttle from 'lodash.throttle';
import theme from '../../theme';
import { isDevice } from '../../helpers';
import SectionContext from '../layout/context';

const NavigatorWrapper = styled.div`
  width: 15px;
  height: 68vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  @media only screen and (max-width: ${theme.SIZES.M}) {
    height: 80vh;
    &.navigator-mobile-works {
      top: 0;
    }
  }
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
  &.selected {
    border: 3px solid ${theme.selectedNavigatorItemColor};
    background-color: ${theme.selectedNavigatorItemColor};
  }
  @media only screen and (min-width: ${theme.SIZES.M}) {
    &:hover {
      border: 3px solid ${theme.selectedNavigatorItemColor};
      background-color: ${theme.selectedNavigatorItemColor};
    }
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
  width: 100px;
`;

const addMouseWheelEventListener = scrollHandler => {
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

const scrollToSelectedProject = (selectedItem, section) => {
  // Scroll to selected project
  if (isDevice()) {
    if (section === 'mobile-works') {
      let projectItem = document.getElementById(`project-item-${selectedItem}`);
      if (projectItem) {
        projectItem.scrollIntoView();
      }
    } else {
      window.scroll({ top: 0, behavior: 'smooth' });
    }
  // Is desktop
  } else {
    if (selectedItem === 0) {
      window.scroll({ top: 0, behavior: 'smooth' });
    } else {
      let projectItem = document.getElementById(`project-item-${selectedItem}`);
      if (projectItem) {
        projectItem.scrollIntoView();
      }
    }
  }
}

const goToItem = (direction, setSelectedItem, items) => {
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
};

const keyDownEffect = (setSelectedItem, items) => {
  var isAnimating = false;

  // Function to handle a key down event
  const keyDownHandler = event => {
    var key = event.key || event.keyCode;
    if (!isAnimating) {
      let delay = 0;
      isAnimating = true;
      // Pressed key is arrow down
      if (String(key) === 'ArrowDown' || String(key) === '40' || String(key) === 'PageDown' || String(key) === '34') {
        goToItem('DOWN', setSelectedItem, items);
        delay = 500;
      }
      // Pressed key is arrow up
      else if (String(key) === 'ArrowUp' || String(key) === '38' || String(key) === 'PageUp' || String(key) === '33') {
        goToItem('UP', setSelectedItem, items);
        delay = 200;
      }
      setTimeout(() => isAnimating = false, delay);
    }
  };

  // Add event listener for keydown event
  document.addEventListener('keydown', keyDownHandler, false);

  return () => document.removeEventListener('keydown', keyDownHandler, false);
}

const mouseWheelEffect = (setSelectedItem, items) => {
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
        // Set selected item to state based on mouse wheel direction
        goToItem(direction, setSelectedItem, items);
        // Let the animation of item visulization finish before letting scroll to next or previous item
        setTimeout(() => {
          isAnimating = false;
          isScrolling = false;
        }, 750);
      }, 300);
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
}

const Navigator = ({ items, navigatorRef }) => {
  const [selectedItem, setSelectedItem] = useState(0); // Item index or item hash from URL

  // useEffect to assign state values to navigatorRef
  useEffect(() => {
    navigatorRef.current = { selectedItem, setSelectedItem }
  }, [selectedItem, setSelectedItem, navigatorRef]);

  // Use section context
  const { section } = useContext(SectionContext);

  // useEffect scroll to selected item
  useEffect(() => {
    if (document.getElementById('span_navigator')) {
      // Scroll to selected project
      console.log('Scroll to selected project', selectedItem)
      scrollToSelectedProject(selectedItem, section);
    }
  });

  // useEffect to handle on key down navigation
  useEffect(() => keyDownEffect(setSelectedItem, items), [items]);

  // useEffect hook to handle scroll mouse wheel navigation
  useEffect(() => mouseWheelEffect(setSelectedItem, items), [items]);

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
    <NavigatorWrapper className={`navigator-${section}`}>
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
