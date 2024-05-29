import React from "react";
import styled from "styled-components";
import Select from "../../components/Select";

const Controls = styled.div`
  display: flex;
  gap: 1.5rem;

  @media only screen and (max-width: 850px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(18rem, 2fr));
  }
`;

const SearchInput = styled.input`
  padding: 0.8rem;
  font-size: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;

  &:focus {
    border-color: var(--color-green-400);
    box-shadow: 0 0 5px var(--color-green-400);
    outline: none;
  }
`;

function TourFilters({
  searchQuery,
  setSearchQuery,
  sortOrder,
  setSortOrder,
  filterDifficulty,
  setFilterDifficulty,
}) {
  return (
    <div>
      <Controls>
        <SearchInput
          type="text"
          placeholder="Search tours..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="none">Sort By</option>
          <option value="distance">Distance</option>
          <option value="difficulty">Difficulty</option>
          <option value="price">Price</option>
        </Select>

        <Select
          value={filterDifficulty}
          onChange={(e) => setFilterDifficulty(e.target.value)}
        >
          <option value="all">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="difficult">Difficult</option>
        </Select>
      </Controls>
    </div>
  );
}

export default TourFilters;
