
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

const getField = (data, attr, language) => {
  if (language === 'en') {
    return data[attr];
  } else {
    return data[`${attr}_${language}`];
  }
}

export {
  getSize,
  isDevice,
  isDesktop,
  getField
}
