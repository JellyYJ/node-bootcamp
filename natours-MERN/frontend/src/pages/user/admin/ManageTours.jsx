import { useState } from "react";
import styled from "styled-components";
import { useTours } from "../../tour/useTours";
import { useCreateTour } from "./useTourActions";
import { useUpdateTour } from "./useUpdateTour";

import TourCard from "../../tour/TourCard";
import Spinner from "../../../components/Spinner";
import Empty from "../../../components/Empty";
import Heading from "../../../components/Heading";
import AddTourForm from "./AddTourForm";
import UpdateTourForm from "./UpdateTourForm";

const Container = styled.div`
  max-width: 130rem;
  margin: 0 auto;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media only screen and (max-width: 1180px) {
    max-width: 100rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.6rem;
  color: #fff;
  background-color: var(--color-green-500);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--color-green-600);
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  gap: 3rem;

  @media only screen and (max-width: 850px) {
    grid-template-columns: 1fr;
  }
`;

const CardContainer = styled.div`
  background-color: var(--color-green-0);
  border-radius: 3px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-0.5%);
    box-shadow: var(--shadow-lg);
  }
`;

const ActionButtons = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  color: #fff;
  background-color: var(--color-green-500);
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--color-green-600);
  }
`;

function ManageTours() {
  const { isPending, tours } = useTours();
  const { isCreating, createTour } = useCreateTour();
  const { isUpdating, updateTour } = useUpdateTour();

  const [selectedTour, setSelectedTour] = useState(null);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAdd = () => {
    setSelectedTour(null);
    setShowAddModal(true);
  };

  const handleEdit = (tour) => {
    setSelectedTour(tour);
    setShowUpdateModal(true);
  };

  const handleDelete = (tourId) => {};

  const handleSave = (tourData) => {
    createTour(tourData);
    setShowAddModal(false);
  };

  const handleUpdate = (formData, tourId) => {
    updateTour({ formData, tourId });
    setShowUpdateModal(false);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowUpdateModal(false);
  };

  if (isPending) return <Spinner />;
  if (!tours) return <Empty resourceName="Tours" />;

  return (
    <Container>
      <Header>
        <Heading as="h4">Manage Tours</Heading>
        <AddButton onClick={handleAdd}>Add New Tour</AddButton>
      </Header>
      <GridContainer>
        {tours.map((tour) => (
          <CardContainer key={tour.slug}>
            <TourCard tour={tour} />
            <ActionButtons>
              <ActionButton onClick={() => handleEdit(tour)}>Edit</ActionButton>
              <ActionButton onClick={() => handleDelete(tour.id)}>
                Delete
              </ActionButton>
            </ActionButtons>
          </CardContainer>
        ))}
      </GridContainer>

      {showAddModal && (
        <AddTourForm
          tour={selectedTour}
          onClose={handleCloseModal}
          onSave={handleSave}
          isCreating={isCreating}
        />
      )}

      {showUpdateModal && (
        <UpdateTourForm
          tour={selectedTour}
          onClose={handleCloseModal}
          onUpdate={handleUpdate}
          isUpdating={isUpdating}
        />
      )}
    </Container>
  );
}

export default ManageTours;
