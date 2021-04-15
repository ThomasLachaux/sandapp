import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import styled from 'styled-components';
import React, { useState } from 'react';
import { Flex, Text, Title } from './Helpers';
import { Button, IconButton } from './Button';
import ConfirmModal from './ConfirmModal';
import api from '../utils/api';
import { modalStyle } from '../utils/style';
import { ModalInput } from './Form';

const RootContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  min-width: 400px;
  width: calc(100% - 20px);
  border: 1px solid #e2e2e2;
  padding-top: 5px;
  padding-left: 10px;
  border-radius: 5px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100px;
`;

const SandwichName = styled(Title)`
  margin: 0px;
`;

const UpdateModal = ({ isOpen, onRequestClose, sandwich, loading, setLoading, onUpdate }) => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      name: sandwich.name,
      toppings: sandwich.toppings.join(','),
      breadType: sandwich.breadType,
    },
  });

  const onSubmit = (data) => {
    setLoading(true);
    api
      .put(`sandwiches/${sandwich._id}`, {
        name: data.name,
        toppings: data.toppings.split(',').map((string) => string.trim()),
        breadType: data.breadType,
      })
      .then(() => {
        toast.success(`The sandwich ${sandwich.name} has been edited`);
        setLoading(false);
        onUpdate({ ...sandwich, name: data.name, toppings: data.toppings.split(','), breadType: data.breadType });
        onRequestClose();
      })
      .catch(() => setLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={modalStyle}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="column" alignItems="center" margin="10px">
          <Title level={3}>Edit sandwich</Title>
          <div>
            <Text color="red">
              {Object.values(errors).map((error, index) => (
                <div key={index}>{error.message}</div>
              ))}
            </Text>
          </div>
          <ModalInput type="text" placeholder="Name" name="name" ref={register({ required: 'Please enter a name' })} />
          <ModalInput
            type="text"
            placeholder="Toppings (separated with commas)"
            name="toppings"
            ref={register({
              required: 'Please enter toppings',
              pattern: { value: /^([\w ]+,)+[\w ]+\w$/, message: 'Please enter toppings separated with commas' },
            })}
          />
          <ModalInput
            type="text"
            placeholder="Bread type"
            name="breadType"
            ref={register({ required: 'Please enter a bread type' })}
          />

          <Flex margin="10px">
            <Button type="button" onClick={onRequestClose} disabled={loading}>
              Close
            </Button>
            <Button primary type="submit" disabled={loading}>
              Edit sandwich
            </Button>
          </Flex>
        </Flex>
      </form>
    </Modal>
  );
};

const AdminSandwichCard = ({ sandwich, onUpdate, onDelete }) => {
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [updateModalLoading, setUpdateModalLoading] = useState(false);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteModalLoading, setDeleteModalLoading] = useState(false);

  const deleteSandwich = () => {
    setDeleteModalLoading(true);
    api.delete(`sandwiches/${sandwich._id}`).then(() => {
      toast.success(`The sandwich ${sandwich.name} has been deleted`);
      setDeleteModalLoading(false);
      onDelete(sandwich);
    });
  };

  return (
    <>
      <RootContainer>
        <InfoContainer>
          <div>
            <SandwichName level={2}>{sandwich.name}</SandwichName>
            <Text color="gray">{sandwich.toppings.join(', ')}</Text>
            <br />
            <Text color="gray">{sandwich.breadType} bread</Text>
          </div>
        </InfoContainer>
        <Flex margin="5px" alignItems="center">
          <IconButton onClick={() => setUpdateModalVisible(true)}>
            <i className="fa fa-edit" />
          </IconButton>
          <IconButton onClick={() => setDeleteModalVisible(true)}>
            <i className="fa fa-trash" />
          </IconButton>
        </Flex>
      </RootContainer>
      <UpdateModal
        isOpen={updateModalVisible}
        onRequestClose={() => setUpdateModalVisible(false)}
        sandwich={sandwich}
        loading={updateModalLoading}
        setLoading={setUpdateModalLoading}
        onUpdate={onUpdate}
      />
      <ConfirmModal
        isOpen={deleteModalVisible}
        title={`Are you sure to delete the ${sandwich.name} sandwich ?`}
        onYes={deleteSandwich}
        onNo={() => setDeleteModalVisible(false)}
        onRequestClose={() => setDeleteModalVisible(false)}
        loading={deleteModalLoading}
      />
    </>
  );
};

export default AdminSandwichCard;
