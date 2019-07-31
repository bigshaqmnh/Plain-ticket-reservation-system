import React, { useContext } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Image, Spinner } from 'react-bootstrap';

import CustomInput from '../../../components/customInput';
import CustomButton from '../../../components/customButton';

import useFormData from '../../../hooks/useFormData';

import userApi from '../../../api/user';

import { accountFormData } from '../../../constants/formDataSchemes';
import componentStyles from '../../../constants/componentStyles';
import { accountValidationScheme } from '../../../constants/validation/schemes';
import { maxPhotoUploadSize } from '../../../constants/common';

import { UserContext } from '../../../context/user';
import { AlertContext } from '../../../context/alert';

function AccountForm(props) {
  const { history } = props;

  const { updateUser } = useContext(UserContext);
  const { setAlert, setShowAlert } = useContext(AlertContext);

  const { formData, setFormData, isShown, canEdit, handleChange, handleSave } = useFormData({
    props,
    formDataScheme: accountFormData,
    validationScheme: accountValidationScheme,
    api: userApi,
    setAlert,
    setShowAlert
  });

  const handleImageChange = ({ target }) => {
    const chosenFile = target.files[0];
    const fileReader = new FileReader();

    fileReader.readAsDataURL(chosenFile);

    fileReader.onloadstart = event => {
      const fileSize = event.total;

      if (fileSize > maxPhotoUploadSize) {
        setAlert({
          variant: componentStyles.error,
          heading: 'Not Uploaded',
          mainText: 'The image is too large. '
        });

        fileReader.abort();
        setShowAlert(true);
      }
    };

    fileReader.onload = () => {
      const base64Image = fileReader.result;

      setFormData({ ...formData, photo: { value: base64Image } });
    };
    history.replace('/account/edit');
  };

  return isShown ? (
    <div className="form-container">
      <div className="user-photo">
        <label htmlFor="photo">
          <Image height="128" width="128" src={formData.photo.value} alt="user photo" roundedCircle />
          <input
            className="input-photo"
            type="file"
            name="photo"
            id="photo"
            accept="image/*"
            onChange={handleImageChange}
          />
          <p className="img-text">Change Photo</p>
        </label>
      </div>

      <CustomInput
        label="Username"
        name="username"
        value={formData.username.value}
        onChange={handleChange}
        disabled={!canEdit}
      />
      <CustomInput label="Email" name="email" value={formData.email.value} disabled />
      {canEdit ? (
        <CustomButton variant={componentStyles.success} text="Save" onClick={() => handleSave(updateUser)} />
      ) : (
        <LinkContainer to="/account/edit">
          <CustomButton variant={componentStyles.warning} text="Change username" />
        </LinkContainer>
      )}
    </div>
  ) : (
    <Spinner animation="border" />
  );
}

export default AccountForm;
