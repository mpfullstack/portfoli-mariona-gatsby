import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import InnerContainerWrapper from './innercontainer.style';

const Header = ({ siteTitle }) => (
  <header>
    <InnerContainerWrapper>
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </InnerContainerWrapper>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
