import React, { useState } from 'react';
import styled from 'styled-components';
import every from 'lodash.every';
import trim from 'lodash.trim';
import Field from './field';
import Button from '../button';
import InputWrapper from './inputWrapper';
import leftArrow from '../../images/leftArrow.png';

const ContactFormWrapper = styled.div`
  width: 100%;
  h1 {
    margin-top: 0 !important;
  }
  .back {
    background: url(${leftArrow}) no-repeat 0 0;
    border: none;
    width: 100px;
    height: 20px;
    margin-bottom: 20px;
    cursor: pointer;
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
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validateForm(fieldsData) {
  return every(Object.keys(fieldsData), key => {
    let isValid = trim(String(fieldsData[key])) !== '';
    if (key === 'email') {
      isValid = validateEmail(trim(String(fieldsData[key])));
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

const ContactForm = ({ onClickBack }) => {
  const [data, setData] = useState({
    fields: {
      firstname: {value: '', focus: false},
      email: {value: '', focus: false},
      explainMe: {value: '', focus: false},
    },
    valid: false
  });

  function handleFormChange() {
    return e => handleDataChange(e, setData);
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

  const textAreaClassNames = ['explainMe-field'];
  if (data.fields.explainMe.value || data.fields.explainMe.focus) {
    textAreaClassNames.push('focus');
  }

  return (
    <ContactFormWrapper>
      <button className='back' onClick={() => onClickBack()}></button>
      <h1>{`Let's talk`}</h1>
      <p>Interested in working together?<br />
      Or just to say hello, please do not<br />
      hesitate to contacte me.</p>
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
          <Button className='submit-form-button'>{`Send`}</Button>
        </Field>
      </Form>
    </ContactFormWrapper>
  );
}

export default ContactForm;
