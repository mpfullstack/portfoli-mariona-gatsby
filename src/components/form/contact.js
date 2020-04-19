import React, { useState } from 'react';
import styled from 'styled-components';
import Scrollbar from 'react-scrollbars-custom';
import every from 'lodash.every';
import trim from 'lodash.trim';
import Field from './field';
import Button from '../button';
import InputWrapper from './inputWrapper';
import leftArrow from '../../images/leftArrow.png';
import theme from '../../theme';
import SuperFetch from '../../helpers/superFetch';

const ContactFormWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  h1 {
    margin-top: 0 !important;
  }
  p {
    @media only screen and (max-width: ${theme.SIZES.M}) {
      margin-bottom: 0 !important;
    }
  }
  .back {
    background: url(${leftArrow}) no-repeat 0 0;
    border: none;
    width: 100px;
    height: 20px;
    margin-bottom: 20px;
    cursor: pointer;
    position: fixed;
    z-index: 100;
    top: -550px;
    @media only screen and (max-width: ${theme.SIZES.M}) {
      top: -30px;
    }
    @media only screen and (max-height: 719px) and (min-width: ${theme.SIZES.M}) {
      top: -580px;
    }
  }
  .scrollbar {
    height: auto;
    @media only screen and (max-width: ${theme.SIZES.M}) {
      height: 78vh !important;
    }
    .inner-content {
      height: auto;
      padding-right: 10px;
      position: fixed;
      bottom: 0;
      @media only screen and (max-width: ${theme.SIZES.M}) {
        position: inherit;
        bottom: inherit;
      }
      @media only screen and (max-height: 719px) {
        bottom: 40px;
      }
    }
  }
`;

const Form = styled.form`
  width: 100%;
  margin: 0;
  .submit-form-button {
    margin-top: 50px;
  }
`;

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validateForm(fieldsData) {
  return every(Object.keys(fieldsData), key => {
    let isValid = trim(String(fieldsData[key].value)) !== '';
    if (key === 'email') {
      isValid = validateEmail(trim(String(fieldsData[key].value)));
    }
    return isValid;
  });
}

function handleDataChange(e, setData) {
  e.persist();
  setData(data => {
    const newData = {
      fields: {
        ...data.fields,
        [e.target.name]: {
          value: e.target.value,
          focus: true
        }
      }
    };
    return {
      ...newData,
      valid: validateForm(newData.fields)
    }
  });
}

const FormElement = ({ handleFormChange, focusOut, data, onSubmit }) => {
  const textAreaClassNames = ['explainMe-field'];
  if (data.fields.explainMe.value || data.fields.explainMe.focus) {
    textAreaClassNames.push('focus');
  }
  return (
    <Scrollbar className='scrollbar'>
      <div className='inner-content'>
        <h1>{`Let's talk`}</h1>
        <p>Interested in working together? Or just to say hello, please do not hesitate to contacte me.</p>
        {data.status === 'sent' ?
        <p>Your request was sent successfully</p>
        :
        <Form>
          <Field className={(data.fields.firstname.value || data.fields.firstname.focus) && 'focus'}>
            <label>Name</label>
            <InputWrapper>
              <input type='text' name='firstname' value={data.fields.firstname.value} onChange={handleFormChange()} onFocus={handleFormChange()} onBlur={focusOut} />
            </InputWrapper>
          </Field>
          <Field className={(data.fields.email.value || data.fields.email.focus) && 'focus'}>
            <label>Email</label>
            <InputWrapper>
              <input type='email' name='email' value={data.fields.email.value} onChange={handleFormChange()} onFocus={handleFormChange()} onBlur={focusOut} />
            </InputWrapper>
          </Field>
          <Field className={textAreaClassNames.join(' ')}>
            <label>Explain me!</label>
            <InputWrapper>
              <textarea name='explainMe' value={data.fields.explainMe.value} onChange={handleFormChange()} onFocus={handleFormChange()} onBlur={focusOut} />
            </InputWrapper>
          </Field>
          <Field>
            <Button className='submit-form-button' onClick={onSubmit}>{`Send`}</Button>
          </Field>
        </Form>}
      </div>
    </Scrollbar>
  );
}

const ContactForm = ({ onClickBack, ...rest }) => {
  const [data, setData] = useState({
    fields: {
      firstname: {value: '', focus: false},
      email: {value: '', focus: false},
      explainMe: {value: '', focus: false},
    },
    valid: false,
    status: 'pending'
  });

  function handleFormChange() {
    return e => handleDataChange(e, setData);
  }

  function onSubmit(e) {
    e.preventDefault();
    if (data.valid) {
      SuperFetch.post(`/api/contact-form`, {
        firstname: data.fields.firstname.value,
        email: data.fields.email.value,
        explainMe: data.fields.explainMe.value
      }).then(res => {
        if (res.status === 'sent') {
          setData(data => ({
            ...data,
            status: 'sent'
          }));
        } else {
          setData(data => ({
            ...data,
            status: 'error'
          }));
        }
      });
    }
  }

  function focusOut(e) {
    e.persist();
    setData(data => {
      if (trim(e.target.value) === '') {
        return {
          fields: {
            ...data.fields,
            [e.target.name]: {
              focus: false
            }
          }
        }
      } else {
        return data;
      }
    })
  }

  return (
    <ContactFormWrapper>
      <button className='back' onClick={() => onClickBack()}></button>
      <FormElement handleFormChange={handleFormChange} data={data} focusOut={focusOut} onSubmit={onSubmit} />
    </ContactFormWrapper>
  );
}

export default ContactForm;
