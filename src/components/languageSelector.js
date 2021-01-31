import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { useIntl } from 'gatsby-plugin-intl';
import languageConfig from '../../language-config';
import theme from '../theme';
import { buildLink, buildPathUrl, isDevice } from '../helpers';

const LanguageSelectorWrapper = styled.ul`
  position: absolute;
  top: 20px;
  z-index: 1000;
  left: 0;
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  li {
    padding: 0;
    margin: 0 8px 0 0;
    &:first-child {
      margin-left: 20px;
    }
    a {
      text-transform: uppercase;
      font-size: 14px;
      color: ${theme.textColor};
    }
    &.selected {
      a {
        font-weight: 800;
        text-decoration: underline;
      }
    }
  }
`;

const LanguageSelector = ({ project }) => {
  const intl = useIntl();

  return (
    <LanguageSelectorWrapper>
      {languageConfig.languages.map(language => {
        let linkTo;
        if (project) {
          linkTo = buildPathUrl(project, language);
        } else if (typeof window === 'object') {
          const location = window.location;
          const hash = location.hash;
          linkTo = location.pathname.replace(`/${intl.locale}/`, `/${language}/`);
          if (hash) {
            linkTo += hash;
          }
        }
        if (project && isDevice()) {
          return null;
        } else {
          return (
            <li className={language === intl.locale ? 'selected' : ''}>
              <Link className='link' to={buildLink(linkTo, language)}>{language}</Link>
            </li>
          );
        }
      })}
    </LanguageSelectorWrapper>
  );
}

export default LanguageSelector;