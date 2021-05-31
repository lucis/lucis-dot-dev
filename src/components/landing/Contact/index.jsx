import React from 'react';
import { Container } from 'components/common';
import contact from 'assets/illustrations/contact.svg';
import styled from 'styled-components';
import { Wrapper, Details, Thumbnail } from './styles';
import ContactForm from './ContactForm';

export const Contact = () => (
  <MegaWrapper>
    <Title>Send me a hey!</Title>
    <Wrapper as={Container} id="contact">
      <Details>
        <ContactForm />
      </Details>
      <Thumbnail>
        <img src={contact} alt="I’m John and I’m a Backend & Devops engineer!" />
      </Thumbnail>
    </Wrapper>
  </MegaWrapper>
);

const MegaWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  text-align: center;
`;
