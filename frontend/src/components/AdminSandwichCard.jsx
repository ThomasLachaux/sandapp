import styled from 'styled-components';
import React, { useState } from 'react';
import { Flex, Text, Title } from './Helpers';
import { IconButton } from './Button';
import ConfirmModal from './ConfirmModal';

const RootContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  min-width: 400px;
  width: calc(100% - 20px);
  border: 1px solid #e2e2e2;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100px;
`;

const Thumbnail = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 10px;
`;

const SandwichName = styled(Title)`
  margin: 0px;
`;

const StyledAvailibility = styled.div`
  color: ${({ theme, available }) => (available ? theme.green : theme.red)};
`;

const Availibility = ({ available }) => (
  <StyledAvailibility available={available}>{available ? 'Available' : 'Not available'}</StyledAvailibility>
);

const AdminSandwichCard = () => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  return (
    <>
      <RootContainer>
        <Flex>
          <Thumbnail src="https://dummyimage.com/300" />
          <InfoContainer>
            <div>
              <SandwichName level={3}>BLT</SandwichName>
              <Text color="gray">Bacon, Lettuce, Tomato</Text>
            </div>
            <Availibility />
          </InfoContainer>
        </Flex>
        <Flex margin="5px" alignItems="center">
          <IconButton onClick={() => setDeleteModalVisible(true)}>
            <i className="fa fa-minus" />
          </IconButton>
          <IconButton>
            <i className="fa fa-edit" />
          </IconButton>
        </Flex>
      </RootContainer>
      <ConfirmModal
        isOpen={deleteModalVisible}
        title="Are you sure to delete the $SANDWICH sandwich ?"
        onNo={() => setDeleteModalVisible(false)}
        onRequestClose={() => setDeleteModalVisible(false)}
      />
    </>
  );
};

export default AdminSandwichCard;
