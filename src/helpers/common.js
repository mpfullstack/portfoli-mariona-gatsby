const getSlug = require('speakingurl');

const common = {
  getField: (data, attr, language) => {
    if (language === 'en') {
      return data[attr];
    } else {
      return data[`${attr}_${language}`];
    }
  },
  buildPathUrl: (project, language) => {
    const seoUrl = common.getField(project, 'seo_url', language);
    if (!seoUrl) {
      return getSlug(common.getField(project, 'title', language));
    } else {
      return seoUrl;
    }
  }
}

module.exports = common;