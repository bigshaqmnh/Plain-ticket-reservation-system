import React from 'react';
import PropTypes from 'prop-types';

import AccountForm from './AccountForm';
import CustomButton from '../../components/customButton';
import CustomAlert from '../../components/customAlert';

import useFetchData from '../../hooks/useFetchData';
import useAlert from '../../hooks/useAlert';

import userApi from '../../api/user';

import { deleteUserToken } from '../../helpers/token';

import componentStyles from '../../constants/componentStyles';

import './style.scss';

function AccountContainer(props) {
  const { history } = props;

  const { items: user, isLoading } = useFetchData(userApi.getUserInfo);

  const { alert, setAlert, showAlert, setShowAlert } = useAlert();

  const handleUpdateUser = async data => {
    try {
      await userApi.updateUser(data);

      setAlert({
        variant: componentStyles.success,
        heading: 'Updated',
        mainText: 'User was successfully updated.',
        isShown: setShowAlert
      });
    } catch (err) {
      setAlert({
        variant: componentStyles.error,
        heading: 'Not updated',
        mainText: 'An error occured while updating user data.',
        isShown: setShowAlert
      });
    } finally {
      setShowAlert(true);
    }
  };

  const handleLogOut = () => {
    deleteUserToken();

    history.replace('/auth');
    history.go();
  };

  return (
    !isLoading && (
      <>
        <AccountForm user={user} handleSave={handleUpdateUser} />
        <CustomButton variant={componentStyles.error} text="Log out" onClick={handleLogOut} />
        {showAlert && <CustomAlert {...alert} />}
      </>
    )
  );
}

AccountContainer.propTypes = {
  history: PropTypes.shape({}).isRequired
};

export default AccountContainer;
