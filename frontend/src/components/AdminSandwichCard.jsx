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

const AdminSandwichCard = () => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  return (
    <>
      <RootContainer>
        <InfoContainer>
          <div>
            <SandwichName level={2}>BLT</SandwichName>
            <Text color="gray">Bacon, Lettuce, Tomato</Text>
          </div>
        </InfoContainer>
        <Flex margin="5px" alignItems="center">
          <IconButton>
            <i className="fa fa-edit" />
          </IconButton>
          <IconButton onClick={() => setDeleteModalVisible(true)}>
            <i className="fa fa-trash" />
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
