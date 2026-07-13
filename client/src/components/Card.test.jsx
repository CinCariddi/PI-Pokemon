import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Card from './Card';

const renderCard = (props) => render(
  <MemoryRouter>
    <Card {...props} />
  </MemoryRouter>,
);

describe('Card', () => {
  const pikachu = {
    id: 25,
    name: 'pikachu',
    image: 'https://example.com/pikachu.png',
    types: ['electric'],
  };

  it('shows the name and the image of the Pokemon', () => {
    renderCard(pikachu);

    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'pikachu' })).toHaveAttribute('src', pikachu.image);
  });

  it('links to the detail page of the Pokemon', () => {
    renderCard(pikachu);

    expect(screen.getByRole('link')).toHaveAttribute('href', '/home/25');
  });

  it('joins multiple types', () => {
    renderCard({ ...pikachu, types: ['grass', 'poison'] });

    expect(screen.getByText('grass - poison')).toBeInTheDocument();
  });
});
