import React from 'react';
import Modal from 'react-modal';
import { modalStyle } from '../utils/style';
import { Button } from './Button';
import { Flex, Title } from './Helpers';

const ConfirmModal = ({ isOpen, onRequestClose, title, onYes, onNo, loading }) => (
  <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel={title} style={modalStyle}>
    <Flex direction="column" alignItems="center">
      <Title level={2}>{title}</Title>
      <Flex margin="10px">
        <Button onClick={onNo} disabled={loading}>
          No
        </Button>
        <Button onClick={onYes} disabled={loading} primary>
          Yes
        </Button>
      </Flex>
    </Flex>
  </Modal>
);

export default ConfirmModal;
