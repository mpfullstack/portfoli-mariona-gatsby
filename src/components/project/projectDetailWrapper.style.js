import styled from 'styled-components';
import theme from '../../theme';
import backArrow from '../../images/arrowBack.png';

const ProjectDetailWrapper = styled.div`
  position: relative;
  .back-to-works {
    width: 100%;
    position: absolute;
    z-index: 100;
    top: 0;
    background-color: ${theme.backgroundColor};
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 13px;
    margin: 0;
    padding: 5px 0;
    @media only screen and (max-width: ${theme.SIZES.M}) {
      margin: 0;
      padding: 13px;
    }
    .link {
      color: ${theme.linkColor};
      text-transform: uppercase;
      display: flex;
      align-items: center;
      line-height: 1.5;
      &::before {
        content: ' ';
        background: url(${backArrow}) no-repeat 0 0;
        width: 28px;
        height: 16px;
        display: inline-block;
        background-size: 18px auto;
        z-index: 1000;
      }
    }
    .link-poject-title {
      margin-left: 5px;
      text-transform: uppercase;
      color: ${theme.textColor};
      &::before {
        content: '/';
        margin-right: 5px;
      }
    }
  }
  .ScrollbarsCustom {
    padding-bottom: 75px;
  }
  .ScrollbarsCustom-Track {
    display: none;
  }
  p {
    font-size: 16px;
  }
  .arrow-up-container {
    position: fixed;
    bottom: 15%;
    right: 10px;
    z-index: 2000;
    @media only screen and (min-width: 1500px) {
      right: 3%;
    }
    @media only screen and (min-width: 1600px) {
      right: 6%;
    }
    @media only screen and (min-width: 1700px) {
      right: 9%;
    }
    @media only screen and (min-width: 1900px) {
      right: 10%;
    }
    @media only screen and (min-width: 2100px) {
      right: 15%;
    }
    @media only screen and (min-width: 2300px) {
      right: 20%;
    }
    @media only screen and (max-width: ${theme.SIZES.M}) {
      bottom: 20%;
    }
  }
  /* Apply project detail animations only for desktop */
  @media only screen and (min-width: 991px) {
    .project-item-image {
      .background {
        transition: transform 1s ease-in .2s, height 1s ease-in .2s;
        &.animate {
          transform: scaleX(2.5) translateY(-100px);
          height: 224px;
        }
      }
      .img {
        transition: margin-top 1s ease-in .2s;
        &.animate {
          margin-top: 70px;
        }
      }
      .mobile-img {
        display: none;
      }
    }
    .project-content {
      transition: top 1s ease-in .2s;
      &.animate {
        top: 95px;
      }
    }
    .extra-content {
      .attribute {
        width: 50%;
        display: inline-block;
        vertical-align: top;
      }
    }
    .project-blocks {
      width: 100%;
      left: 0;
      top: 75vh;
      padding-bottom: 150px;
      @media only screen and (max-height: 875px) {
        top: 85vh;
      }
      @media only screen and (max-height: 800px) {
        top: 90vh;
      }
    }
  }
  @media only screen and (max-width: ${theme.SIZES.M}) {
    .gatsby-image-wrapper {
      width: 100%;
    }
    .project-item-image {
      position: inherit;
      .background,
      .desktop-img {
        display: none;
      }
      .mobile-img {
        width: 100%;
        overflow: hidden;
      }
    }
    .project-content {
      position: inherit;
      width: 100%;
    }
    .ScrollbarsCustom-Wrapper {
      right: 0 !important;
    }
    .attribute {
      width: 50%;
      display: inline-block;
      vertical-align: top;
    }
  }
`;

const ProjectDetailInnerWrapper = styled.div`
  width: 100%;
  @media only screen and (max-width: ${theme.SIZES.M}) {
    width: 90%;
    margin: 20px auto 0;
    padding-bottom: 220px;
    & > div {
      position: inherit;
      width: 100%;
    }
  }
`;

export {
  ProjectDetailWrapper,
  ProjectDetailInnerWrapper
};