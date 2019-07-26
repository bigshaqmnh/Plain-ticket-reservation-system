import screen from '../constants/screens';

function getHandlers({ path, history, items, setSelectedItem, setSearchText }) {
  const currentScreen = (() => {
    const splitPath = path.split('/');
    const lastPath = splitPath[splitPath.length - 1];

    switch (lastPath) {
      case 'details':
        return screen.DETAILS;
      case 'add':
        return screen.ADD;
      case 'edit':
        return screen.EDIT;
      default:
        return screen.TABLE;
    }
  })();

  const handleClickItem = event => {
    const { id } = event.currentTarget;
    const selected = items.find(item => item.id === +id);

    setSelectedItem(selected);
  };

  const handleSearchItem = ({ target }) => setSearchText(target.value);

  const handleBackAction = () => history.goBack();

  return {
    currentScreen,
    handleClickItem,
    handleSearchItem,
    handleBackAction
  };
}

export default getHandlers;
