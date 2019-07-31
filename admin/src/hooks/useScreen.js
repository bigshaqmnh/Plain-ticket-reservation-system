import { useState } from 'react';

function useScreen(path) {
  const defaultScreenParams = (() => {
    const splitPath = path.split('/');
    const lastPath = splitPath[splitPath.length - 1];

    switch (lastPath) {
      case 'details':
        return { isShown: false, canEdit: false };
      case 'add':
        return { isShown: true, canEdit: true };
      case 'edit':
        return { isShown: false, canEdit: true };
      default:
        return null;
    }
  })();

  const [isShown, setIsShown] = useState(defaultScreenParams.isShown);

  return { isShown, setIsShown, canEdit: defaultScreenParams.canEdit };
}

export default useScreen;
