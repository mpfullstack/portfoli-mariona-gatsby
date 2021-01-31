/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby';
import { useIntl } from 'gatsby-plugin-intl';
import Header from './header';
import MainContainer from './maincontainer.style';
import ContainerWrapper from './container.style';
import ThemeToggleButton from '../themeToggleButton';
import InnerContainerWrapper from './innercontainer.style';
import LeftContent from '../leftContent';
import RightContent from '../rightContent';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme';
import SectionContext from './context';
import LanguageSelector from '../languageSelector';
import { isDevice } from '../../helpers';

// Main layout css
import './layout.css';
// Animate CSS
import 'animate.css';

const getDefaultSection = locale => {
  let defaultSection = 'intro';
  if (isDevice()) {
    if (typeof window === 'object') {
      const pathname = String(window.location.pathname).replace(`/${locale}/`,'');
      if (pathname) {
        defaultSection = pathname;
      } else {
        const hash = String(window.location.hash).replace('#','');
        if (hash) {
          defaultSection = hash;
        }
      }
    }
  }
  return defaultSection;
}

const Layout = ({ location, children, hideMenu, project = null }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const intl = useIntl();

  // useState hook to set theme mode
  const [mode, setThemeMode] = useState('light');

  // useState hook to handle section
  const [section, setSection] = useState(getDefaultSection(intl.locale));

  // useEffect hook to set theme mode background-color style to body element
  useEffect(() => {
    document.body.style.backgroundColor = theme.backgroundColor({theme: {mode}});
  });

  return (
    <SectionContext.Provider value={{section, setSection}}>
      <ThemeProvider theme={{ mode: mode }}>
        <MainContainer className='main'>
          <Header siteTitle={data.site.siteMetadata.title} />
          <ThemeToggleButton setThemeMode={setThemeMode} mode={mode} />
          <main>
            <ContainerWrapper>
              <InnerContainerWrapper>
                {/*
                  Language selector
                  ------------------------------------------------------------------------------ */}
                <LanguageSelector project={project} />
                {/*
                  Left content including Menu, Title and introduction with a contact form button
                  ------------------------------------------------------------------------------ */}
                <LeftContent location={location} hideMenu={hideMenu} />

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
    </SectionContext.Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
