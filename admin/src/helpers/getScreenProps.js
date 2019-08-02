export default path => {
  const splitPath = path.split('/');
  const lastPath = splitPath[splitPath.length - 1];

  switch (lastPath) {
    case 'details':
      return { isShownByDefault: false, canEdit: false };
    case 'auth':
    case 'add':
      return { isShownByDefault: true, canEdit: true };
    case 'edit':
      return { isShownByDefault: false, canEdit: true };
    default:
      return null;
  }
};
