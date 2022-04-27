import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import profileIcon from '../images/profileIcon.svg';

const pageTitle = 'page-title';
const searchTopBtn = 'search-top-btn';

describe('Testa se o header possui os componentes corretos', () => {
  test('Em /foods, verifica se existem os elementos esperados', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    expect(history.location.pathname).toBe('/foods');
    const profileBtn = screen.getByRole('link', { src: { profileIcon } });
    expect(profileBtn).toBeDefined();
    // const titleFoods = screen.getByTestId(pageTitle);
    expect(await screen.getByTestId(pageTitle)).toBeInTheDocument();
    const searchBtn = screen.getByTestId(searchTopBtn);
    expect(searchBtn).toBeDefined();
  });

  test('Em rotas distintas, verifica se os elementos aparecem como esperado', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52771');
    const profileBtn = screen.getByTestId('profile-top-btn');
    expect(profileBtn).not.toBeInTheDocument();
    const titleFoods = screen.getByTestId('page-title');
    expect(titleFoods).not.toBeInTheDocument();
    const searchBtn = screen.getByTestId(searchTopBtn);
    expect(searchBtn).not.toBeInTheDocument();
  });

  test('Verifica se o botão profile redireciona o usuário como esperado', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const profileBtn = screen.getByTestId('profile-top-btn');
    expect(profileBtn).toBeDefined();
    userEvent.click(profileBtn);
    expect(history.location.pathname).toBe('/profile');
  });

  test('Testa se o botão de busca funciona adequadamente', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const searchBtn = screen.getByTestId(searchTopBtn);
    expect(searchBtn).toBeDefined();

    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();

    userEvent.click(searchBtn);
    expect(searchInput).not.toBeInTheDocument();
  });
});
