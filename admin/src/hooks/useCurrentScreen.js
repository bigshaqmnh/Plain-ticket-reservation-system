import { useState } from 'react';

function useCurrentScreen({ table, details, add, edit }) {
  const screens = {
    table,
    details,
    add,
    edit
  };

  const [currentScreen, setCurrentScreen] = useState({ render: screens.table });

  return { screens, currentScreen, setCurrentScreen };
}

export default useCurrentScreen;
