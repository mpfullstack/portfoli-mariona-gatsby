import { getField as commonGetField, buildPathUrl as commonBuildPathUrl } from './common';

// keep function reference
const getSize = () => {
  const isClient = typeof window === 'object';
  return {
    width: isClient ? window.innerWidth : undefined,
    height: isClient ? window.innerHeight : undefined
  };
};

const isDevice = () => {
  const size = getSize();
  if (size.width < 990) {
    return true;
  } else {
    return false;
  }
}

const isDesktop = () => {
  const size = getSize();
  if (size.width >= 990) {
    return true;
  } else {
    return false;
  }
}

const getField = (data, attr, language) => commonGetField(data, attr, language);
const buildPathUrl = (project, language) => commonBuildPathUrl(project, language);

const buildLink = (link, language) => {
  if (!link.match(new RegExp(`^/${language}/`, 'gmi'))) {
    return `/${language}/${link}`;
  }
  return link;
}

export {
  getSize,
  isDevice,
  isDesktop,
  getField,
  buildPathUrl,
  buildLink
}
