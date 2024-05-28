export const filterTours = (tours, searchQuery, filterDifficulty) => {
  return tours.filter((tour) => {
    const matchesSearchQuery = tour.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      filterDifficulty === "all" || tour.difficulty === filterDifficulty;
    return matchesSearchQuery && matchesDifficulty;
  });
};

export const sortTours = (tours, sortOrder) => {
  return tours.sort((a, b) => {
    if (sortOrder === "distance") {
      return a.distance - b.distance;
    } else if (sortOrder === "difficulty") {
      const difficultyOrder = { easy: 1, medium: 2, difficult: 3 };
      return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    } else if (sortOrder === "price") {
      return a.price - b.price;
    } else {
      return 0;
    }
  });
};
