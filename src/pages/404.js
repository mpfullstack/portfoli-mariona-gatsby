import React from "react"
import { useIntl } from "gatsby-plugin-intl";
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components";

const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10%;
`;

const NotFoundPage = () => {
  const intl = useIntl();
  return (
    <Layout>
      <NotFoundWrapper>
        <SEO title="404: Not found" lang={intl.locale} />
        <h1>{intl.formatMessage({ id: 'notFound' })}</h1>
        <p>{intl.formatMessage({ id: 'notFoundMessage' })}</p>
      </NotFoundWrapper>
    </Layout>
  );
}

export default NotFoundPage;
