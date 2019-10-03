/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from 'react';
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import MainContainer from './maincontainer.style';
import ContainerWrapper from './container.style';
import InnerContainerWrapper from './innercontainer.style';
import ThemeToggleButton from '../themeToggleButton';

import { ThemeProvider } from 'styled-components';

import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  // Theme mode state hook
  const [mode, setThemeMode] = useState('light');

  return (
    <ThemeProvider theme={{ mode }}>
      <MainContainer className='main'>
        <Header siteTitle={data.site.siteMetadata.title} />
        <ThemeToggleButton setThemeMode={setThemeMode} mode={mode} />
        <main>
          <ContainerWrapper>
            <InnerContainerWrapper>
                {children}
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
