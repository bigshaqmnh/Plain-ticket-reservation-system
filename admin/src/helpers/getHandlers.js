import screen from '../constants/screens';

function getHandlers({ items, setSelectedItem, setCurrentScreen, setSearchText }) {
  const handleClickItem = event => {
    const { id } = event.currentTarget;
    const selected = items.find(item => item.id === +id);

    setSelectedItem(selected);
    setCurrentScreen(screen.DETAILS);
  };

  const handleSearchItem = ({ target }) => {
    setSearchText(target.value);
  };

  const handleShowAddScreen = () => setCurrentScreen(screen.ADD);

  const handleShowEditScreen = () => setCurrentScreen(screen.EDIT);

  const handleBackAction = () => {
    setCurrentScreen(screen.TABLE);
  };

  return {
    handleClickItem,
    handleSearchItem,
    handleShowAddScreen,
    handleShowEditScreen,
    handleBackAction
  };
}

export default getHandlers;
