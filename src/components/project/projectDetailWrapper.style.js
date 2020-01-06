import styled from 'styled-components';

const ProjectDetailWrapper = styled.div`
  .ScrollbarsCustom-Track {
    display: none;
  }
  p {
    font-size: 16px;
  }
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
      @media only screen and (max-height: 875px) {
        top: 85vh;
      }
      @media only screen and (max-height: 800px) {
        top: 90vh;
      }
    }
  }
`;

export default ProjectDetailWrapper;