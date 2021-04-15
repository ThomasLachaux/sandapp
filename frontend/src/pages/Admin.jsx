import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import AdminSandwichCard from '../components/AdminSandwichCard';
import { Button } from '../components/Button';
import { Flex, Text, Title } from '../components/Helpers';
import UserCard from '../components/UserCard';
import api from '../utils/api';
import { ModalInput } from '../components/Form';
import { modalStyle } from '../utils/style';

const SubContainer = styled(Flex)`
  width: 40%;
  min-width: 600px;
`;

const AddModal = ({ isOpen, onRequestClose, loading, setLoading, onAdd }) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    api
      .post(`sandwiches`, {
        name: data.name,
        toppings: data.toppings.split(',').map((string) => string.trim()),
        breadType: data.breadType,
      })
      .then((response) => {
        toast.success(`The sandwich ${response.data.name} has been added`);
        setLoading(false);
        onAdd(response.data);
        onRequestClose();
      })
      .catch(() => setLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={modalStyle}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="column" alignItems="center" margin="10px">
          <Title level={3}>Add sandwich</Title>
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
            placeholder="Toppings (separated with comma)"
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
              Add sandwich
            </Button>
          </Flex>
        </Flex>
      </form>
    </Modal>
  );
};

const UsersContainer = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const userResponse = await api.get('/users');
      setUsers(userResponse.data);

      const orderResponse = await api.get('/orders');
      setOrders(orderResponse.data);

      setLoaded(true);
    })();
  }, []);

  return (
    <SubContainer direction="column">
      <Title stickedLeft>Users 🤵</Title>
      {loaded &&
        users.map((user) => (
          <UserCard
            user={user}
            key={user._id}
            orders={orders.filter((order) => order.madeBy === user._id)}
            onPromote={(promotedUser) =>
              setUsers(
                users.map((mappedUser) =>
                  mappedUser._id === promotedUser._id ? { ...mappedUser, isAdmin: !mappedUser.isAdmin } : mappedUser,
                ),
              )
            }
            onDelete={(deletedUser) => setUsers(users.filter((findUser) => findUser._id !== deletedUser._id))}
          />
        ))}
    </SubContainer>
  );
};

const SandwichesContainer = () => {
  const [sandwiches, setSandwiches] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [addModalLoading, setAddModalLoading] = useState(false);

  useEffect(() => {
    api.get('sandwiches').then((response) => {
      setSandwiches(response.data);
      setLoaded(true);
    });
  }, []);

  return (
    <>
      <SubContainer direction="column">
        <Title stickedLeft>Sandwiches 🥪</Title>
        {loaded &&
          sandwiches.map((sandwich) => (
            <AdminSandwichCard
              key={sandwich._id}
              sandwich={sandwich}
              onDelete={(deletedSandwich) =>
                setSandwiches(sandwiches.filter((findSandwich) => findSandwich._id !== deletedSandwich._id))
              }
              onUpdate={(updatedSandwich) =>
                setSandwiches(
                  sandwiches.map((mappedSandwich) => {
                    if (mappedSandwich._id !== updatedSandwich._id) return mappedSandwich;

                    return {
                      ...mappedSandwich,
                      ...updatedSandwich,
                    };
                  }),
                )
              }
            />
          ))}
        <Button onClick={() => setAddModalVisible(true)}>Add new</Button>
      </SubContainer>
      <AddModal
        isOpen={addModalVisible}
        onRequestClose={() => setAddModalVisible(false)}
        loading={addModalLoading}
        setLoading={setAddModalLoading}
        onAdd={(sandwich) => setSandwiches([...sandwiches, sandwich])}
      />
    </>
  );
};

const Admin = () => (
  <Flex justifyContent="center" margin="20px">
    <UsersContainer />
    <SandwichesContainer />
  </Flex>
);
export default Admin;
