import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { drinkApi, drinkCategoryApi } from '../../services/drinkApi';
import DrinksContext from './DrinksContext';

function DrinksProvider({ children }) {
  const [searchDrinksResults, setSearchDrinksResults] = useState();
  const [drinksResults, setDrinksResults] = useState();
  const [drinksResultsRecover, setDrinksResultsRecover] = useState();
  const [recipeCategories, setRecipeCategories] = useState();

  async function filterByCategory(category) {
    const response = await
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();
    setDrinksResults(data);
  }

  const fetchByDrinkIngredient = async (ingredient) => {
    const request = await
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await request.json();
    setDrinksResults(data);
  };

  useEffect(() => {
    const apiRequest = async () => {
      const data = await drinkApi();
      const dataCategorys = await drinkCategoryApi();
      setRecipeCategories(dataCategorys);
      setDrinksResults(data);
      setDrinksResultsRecover(data);
    };
    apiRequest();
  }, []);
  const contextValue = {
    searchDrinksResults,
    setSearchDrinksResults,
    drinksResults,
    setDrinksResults,
    recipeCategories,
    filterByCategory,
    drinksResultsRecover,
    fetchByDrinkIngredient,
  };
  return (
    <DrinksContext.Provider value={ contextValue }>
      { children }
    </DrinksContext.Provider>

  );
}

DrinksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DrinksProvider;
