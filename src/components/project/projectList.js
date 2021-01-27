import React, { useContext, useRef } from "react";
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import { useIntl } from "gatsby-plugin-intl";
import Img from 'gatsby-image';
import styled from 'styled-components';
import theme from '../../theme';
import TagContainer from '../layout/tagContainer.style';
import Tag from '../tag';
import Navigator from '../navigator';
import AnimatedInView from '../animatedInView';
import ProjectTitle from './projectTitle.style';
import SectionContext from '../layout/context';
import ImageContainer from './imageContainer.style';
import ContentWrapper from './contentWrapper.style';
import { useSwipeable } from 'react-swipeable'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  @media only screen and (max-width: ${theme.SIZES.M}) {
    display: none;
    &.mobile-works {
      display: flex;
    }
  }
`;

const ProjectListWrapper = styled.div`
  flex-grow: 1;
  @media only screen and (max-width: ${theme.SIZES.M}) {
    padding-right: 20px;
  }
  .project-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    .project-item {
      height: 720px;
      position: relative;
      margin: 0;
      @media only screen and (min-height: 720px) {
        height: 900px;
      }
      &:first-child > .project-item-image {
        padding-top: 0;
        margin-top: 0;
        @media only screen and (max-height: 719px) {
          margin-top: -70px;
        }
        @media only screen and (max-width: ${theme.SIZES.M}) {
          margin-top: 50px;
        }
      }
      & > .project-item-image {
        padding-top: 0;
        @media only screen and (min-height: 719px) {
          padding-top: 60px;
        }
      }
    }
  }
`;

const NavigatorWrapper = styled.div`
  flex-basis: 20px;
  @media only screen and (max-width: ${theme.SIZES.M}) {
    flex-basis: 30px;
  }
`;

const animationInDuration = 1700;

const ProjectList = ({ projects }) => {
  // Use section context
  const { section } = useContext(SectionContext);

  const intl = useIntl();

  const navigatorRef = useRef({});

  const handlers = useSwipeable({
    onSwipedDown: () => {
      let selItem = 0;
      if (navigatorRef.current.selectedItem > 0) {
        selItem = navigatorRef.current.selectedItem - 1;
      }
      // Here we are updating state in Navigator component
      navigatorRef.current.setSelectedItem(selItem);
    },
    onSwipedUp: () => {
      let selItem = 0;
      if (navigatorRef.current.selectedItem < projects.length-1) {
        selItem = navigatorRef.current.selectedItem + 1;
        // Here we are updating state in Navigator component
        navigatorRef.current.setSelectedItem(selItem);
      }
    }
  });

  return (
    <Wrapper className={section}>
      <ProjectListWrapper>
        <ul className='project-list' {...handlers}>
          {
            projects.map( ({ node }, i) => {
              return (
                <li className='project-item' key={`project-item-${i}`} id={`project-item-${i}`} name={`project-item-${i}`}>
                  <ImageContainer className='project-item-image'>
                    <AnimatedInView animationIn='fadeInLeft' animationInDelay={200} animationInDuration={animationInDuration}>
                      <div className='background' style={{backgroundColor: node.color.hex_code}} />
                    </AnimatedInView>
                    <AnimatedInView animationIn='fadeInDown' animationInDelay={ i > 0 ? 300 : 0} animationInDuration={animationInDuration}>
                      <Img fluid={node.image.childImageSharp.fluid} />
                    </AnimatedInView>
                  </ImageContainer>
                  <ContentWrapper>
                    <AnimatedInView animationIn='fadeInRight' animationInDelay={200} animationInDuration={animationInDuration} offset={150}>
                      <TagContainer>
                        {node.tags.map((tag, j) => <Tag key={`project-item-${i}-tag-${j}`}>{tag.name}</Tag>)}
                      </TagContainer>
                      <ProjectTitle>
                        <AniLink fade to={`/${intl.locale}/${node.seo_url}`}>{node.title}</AniLink>
                      </ProjectTitle>
                      <AniLink className='know-more' fade to={`/${intl.locale}/${node.seo_url}`}>{intl.formatMessage({ id: 'knowMore' })}</AniLink>
                    </AnimatedInView>
                  </ContentWrapper>
                </li>
              )
            })
          }
        </ul>
      </ProjectListWrapper>
      <NavigatorWrapper>
        <Navigator items={projects} navigatorRef={navigatorRef} />
      </NavigatorWrapper>
    </Wrapper>
  );
}

export default ProjectList;
