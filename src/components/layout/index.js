/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import Header from './header';
import MainContainer from './maincontainer.style';
import ContainerWrapper from './container.style';
import ThemeToggleButton from '../themeToggleButton';
import InnerContainerWrapper from './innercontainer.style';
import LeftContent from '../leftContent';
import RightContent from '../rightContent';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme';
import useWindowSize from '../hooks/useWindowSize';

// Main layout css
import './layout.css';
// Animate CSS
import 'animate.css';

const Layout = ({ location, children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  // useState hook to set theme mode
  const [mode, setThemeMode] = useState('light');

  // useEffect hook to set theme mode background-color style to body element
  useEffect(() => {
    document.body.style.backgroundColor = theme.backgroundColor({theme: {mode}});
  });

  const size = useWindowSize();
  console.log('size', size);

  return (
    <ThemeProvider theme={{ mode: mode, size: () => size }}>
      <MainContainer className='main'>
        <Header siteTitle={data.site.siteMetadata.title} />
        <ThemeToggleButton setThemeMode={setThemeMode} mode={mode} />
        <main>
          <ContainerWrapper>
            <InnerContainerWrapper>
              {/*
                Left content including Menu, Title and introduction with a contact form button
                ------------------------------------------------------------------------------ */}
              <LeftContent location={location} />

              {/*
                Right content
                ------------------------------------------------------------------------------ */}
              <RightContent>
                {children}
              </RightContent>

            </InnerContainerWrapper>
          </ContainerWrapper>
        </main>
        <footer></footer>
      </MainContainer>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
