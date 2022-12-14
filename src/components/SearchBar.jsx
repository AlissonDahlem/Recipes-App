import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import DrinksContext from '../context/DrinksContext/DrinksContext';
import FoodsContext from '../context/FoodsContext/FoodsContext';
import ProfileContext from '../context/ProfileContext/ProfileContext';
// import CSS from '../modules/SearchBar.module.css';
import searchFoodOrDrinkApi from '../services/searchFoodOrDrinkApi';

import '../CSS/search_bar.css';

function SearchBar(props) {
  const [selectedFilter, setSelectedFilter] = useState();
  const [inputSearch, setInputSearch] = useState();
  const { setSearchFoodsResults } = useContext(FoodsContext);
  const { setSearchDrinksResults } = useContext(DrinksContext);
  const { foodOrDrink } = useContext(ProfileContext);

  async function onClick() {
    const { history } = props;
    if (selectedFilter === 'First letter' && inputSearch.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const apiRequest = await searchFoodOrDrinkApi(
        foodOrDrink, selectedFilter, inputSearch,
      );
      if (foodOrDrink === 'food') {
        if (apiRequest.meals === null) {
          global.alert('Sorry, we haven\'t found any recipes for these filters.');
        } else if (apiRequest.meals.length === 1) {
          history.push(`/foods/${apiRequest.meals[0].idMeal}`);
        } return setSearchFoodsResults(apiRequest);
      } if (foodOrDrink === 'drinks') {
        if (apiRequest.drinks === null) {
          global.alert('Sorry, we haven\'t found any recipes for these filters.');
        } else if (apiRequest.drinks.length === 1) {
          history.push(`/drinks/${apiRequest.drinks[0].idDrink}`);
        } return setSearchDrinksResults(apiRequest);
      }
    }
  }

  return (
    <form className="conteiner_form">
      <input
        className="input_search"
        name="searchInput"
        type="text"
        id="searchInput"
        data-testid="search-input"
        onChange={ ({ target }) => setInputSearch(target.value) }
      />
      <fieldset className="radio_search">
        <label htmlFor="ingredient">
          <input
            id="ingredient"
            type="radio"
            data-testid="ingredient-search-radio"
            name="filterSelect"
            value="Ingredient"
            onChange={ ({ target }) => setSelectedFilter(target.value) }
            className="filter"
          />
          <span className="selected_filter">ingredient</span>
        </label>
        <label htmlFor="name-search">
          <input
            id="name-search"
            type="radio"
            data-testid="name-search-radio"
            name="filterSelect"
            value="Name"
            onChange={ ({ target }) => setSelectedFilter(target.value) }
            className="filter"
          />
          <span className="selected_filter">Name</span>
        </label>
        <label htmlFor="first-letter">
          <input
            id="first-letter"
            type="radio"
            data-testid="first-letter-search-radio"
            name="filterSelect"
            value="First letter"
            onChange={ ({ target }) => setSelectedFilter(target.value) }
            className="filter"
          />
          <span className="selected_filter">First letter</span>
        </label>
      </fieldset>
      <button
        className="button_search"
        data-testid="exec-search-btn"
        type="button"
        onClick={ () => onClick() }
      >
        Search
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  history: PropTypes.func.isRequired,
};

export default withRouter(SearchBar);
