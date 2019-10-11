import React, { useState, useEffect } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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
  display: none;
  width: 100px;
`;

const Navigator = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState(0); // Item index or item hash from URL

  // useEffect to enable smooth scroll polyfill only once
  useEffect(() => {
    if (!window.__smoothScrollEnabled) {
      smoothscroll.polyfill();
      window.__smoothScrollEnabled = true;
    }
  });

  // useEffect to show selected project title in navigator and scroll to selected project
  useEffect(() => {
    if (document.getElementById('span_navigator')) {
      // Scroll to selected project
      if (selectedItem === 0) {
        window.scroll({ top: 0, behavior: 'smooth' });
      } else {
        let projectItem = document.getElementById(`project-item-${selectedItem}`);
        projectItem.scrollIntoView({
          behavior: 'smooth'
        });
      }
      // Show selected project title
      setTimeout(() => {
        document.getElementById('span_navigator').style.display = 'inline-block';
      }, 700);
    }
  });

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
                <NavigatorItemTitle id='span_navigator' className={itemClassNames.join(' ')}>
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
