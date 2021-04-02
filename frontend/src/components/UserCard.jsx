import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import api from '../utils/api';
import { Button, IconButton } from './Button';
import { Flex, Title, Text, ButtonLink } from './Helpers';
import ConfirmModal from './ConfirmModal';

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  width: 100%;
  border: 1px solid #e2e2e2;
  padding: 10px 15px;
  border-radius: 5px;
`;

const UserCard = ({ user, orders, onDelete, onPromote }) => {
  const loggedUser = useSelector((state) => state.user);
  const isSelf = user._id === loggedUser._id;

  const [visible, setVisible] = useState(false);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteModalLoading, setDeleteModalLoading] = useState(false);

  const [promoteModalVisible, setPromoteModalVisible] = useState(false);
  const [promoteModalLoading, setPromoteModalLoading] = useState(false);

  const promoteUser = () => {
    setPromoteModalLoading(true);
    api
      .get(`users/${user._id}`)
      .then(() => {
        toast.success(`The user ${user.username} rights have changed`);
        setPromoteModalLoading(false);
        onPromote(user);
        setPromoteModalVisible(false);
      })
      .catch(() => setPromoteModalLoading(false));
  };

  const deleteUser = () => {
    setDeleteModalLoading(true);
    api.delete(`users/${user._id}`).then(() => {
      toast.success(`The user ${user.username} has been deleted`);
      setDeleteModalLoading(false);
      onDelete(user);
    });
  };

  return (
    <>
      <RootContainer>
        <Flex justifyContent="space-between">
          <Title level={2}>{user.username}</Title>
          <IconButton onClick={() => setVisible(!visible)}>
            <i className={`fa fa-chevron-up ${visible ? '' : 'rotate'}`} />
          </IconButton>
        </Flex>
        <Text color="gray">{user.isAdmin ? 'Administrator' : 'Customer'}</Text>
        {visible && (
          <>
            <Title level={4}>Past orders</Title>
            {orders.map((order) => (
              <Text color="gray" key={order._id}>
                #{order.displayId} - {moment(order.createdAt).format('DD.MM.YYYY HH.mm')} · {order.status} ·{' '}
                {order.content.map((sandwich) => `${sandwich.quantity} ${sandwich.name}`).join(', ')}
              </Text>
            ))}

            {!isSelf && (
              <>
                <Title level={4}>User Management</Title>

                <ButtonLink onClick={() => setPromoteModalVisible(true)}>
                  {user.isAdmin ? 'Downgrade to customer' : 'Upgrade to administrator'}
                </ButtonLink>
                <ButtonLink color="red" onClick={() => setDeleteModalVisible(true)}>
                  Delete user
                </ButtonLink>
              </>
            )}
          </>
        )}
      </RootContainer>
      <ConfirmModal
        isOpen={deleteModalVisible}
        title={`Are you sure to delete the user ${user.username} ?`}
        onYes={deleteUser}
        onNo={() => setDeleteModalVisible(false)}
        onRequestClose={() => setDeleteModalVisible(false)}
        loading={deleteModalLoading}
      />
      <ConfirmModal
        isOpen={promoteModalVisible}
        title={`Are you sure to ${user.isAdmin ? 'downgrade' : 'upgrade'} the user ${user.username} ?`}
        onYes={promoteUser}
        onNo={() => setPromoteModalVisible(false)}
        onRequestClose={() => setPromoteModalVisible(false)}
        loading={promoteModalLoading}
      />
    </>
  );
};

export default UserCard;
