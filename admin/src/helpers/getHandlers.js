function getHandlers({ items, setSelectedItem, screens, setCurrentScreen, setSearchText, setCurrentPage }) {
  const handleClickItem = event => {
    const { id } = event.currentTarget;
    const selected = items.find(item => item.id === +id);

    setSelectedItem(selected);
    setCurrentScreen({ render: screens.details });
  };

  const handleSearchItem = ({ target }) => {
    setSearchText(target.value);
  };

  const handleShowAddScreen = () => setCurrentScreen({ render: screens.add });

  const handleShowEditScreen = () => setCurrentScreen({ render: screens.edit });

  const handleBackAction = () => {
    setCurrentScreen({ render: screens.table });
  };

  const handleChangePage = ({ target }) => {
    const selectedPage = +target.name || +target.parentNode.name;

    if (selectedPage) {
      setCurrentPage(selectedPage);
    }
  };

  return {
    handleClickItem,
    handleSearchItem,
    handleShowAddScreen,
    handleShowEditScreen,
    handleBackAction,
    handleChangePage
  };
}

export default getHandlers;
