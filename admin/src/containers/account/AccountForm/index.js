import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

import CustomInput from '../../../components/customInput';
import CustomButton from '../../../components/customButton';
import CustomAlert from '../../../components/customAlert';

import useAlert from '../../../hooks/useAlert';

import componentStyles from '../../../constants/componentStyles';
import { accountValidationScheme } from '../../../constants/validation/schemes';
import { maxPhotoUploadSize } from '../../../constants/common';

import formValidation from '../../../helpers/formValidation';
import extractFormData from '../../../helpers/extractFormData';

import defaultAccountImage from '../../../assets/img/account.svg';

function AccountForm({ user, handleUpdate, handleSave }) {
  const [formData, setFormData] = useState({
    photo: { value: user.photo ? user.photo : defaultAccountImage },
    username: { value: user.username, isValid: true, invalidFeedback: '' },
    email: { value: user.email }
  });

  const [canEdit, setCanEdit] = useState(false);

  const { alert, setAlert, showAlert, setShowAlert } = useAlert();

  const handleEdit = () => setCanEdit(true);

  const handleChange = async ({ target }) => {
    const validatedProp = await formValidation.validateOnChange(accountValidationScheme, 'username', target.value);

    setFormData({
      ...formData,
      ...validatedProp
    });
  };

  const handleSaveClick = () => {
    setCanEdit(false);

    const validatedForm = formValidation.validateOnSubmit(formData);

    if (!validatedForm.isValid) {
      setAlert({ ...validatedForm.alertData, isShown: setShowAlert });
      setShowAlert(true);
    } else {
      const data = extractFormData(formData);

      handleUpdate(data);
      handleSave(data);
    }
  };

  const handleImageChange = ({ target }) => {
    const chosenFile = target.files[0];
    const fileReader = new FileReader();

    fileReader.readAsDataURL(chosenFile);

    fileReader.onload = () => {
      const base64Image = fileReader.result;

      if (base64Image.length > maxPhotoUploadSize) {
        setAlert({
          variant: componentStyles.error,
          heading: 'Not Uploaded',
          mainText: 'The image is too large. ',
          isShown: setShowAlert
        });
        setShowAlert(true);
      } else {
        setFormData({ ...formData, photo: { value: fileReader.result } });
        setCanEdit(true);
      }
    };
  };

  return (
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
        <CustomButton variant={componentStyles.success} text="Save" onClick={handleSaveClick} />
      ) : (
        <CustomButton variant={componentStyles.warning} text="Change username" onClick={handleEdit} />
      )}

      {showAlert && <CustomAlert {...alert} />}
    </div>
  );
}

AccountForm.propTypes = {
  user: PropTypes.shape({
    photo: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string
  }).isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired
};

export default AccountForm;
