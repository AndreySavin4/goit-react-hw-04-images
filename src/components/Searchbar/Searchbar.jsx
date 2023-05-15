import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

export const Searchbar = ({ getInputValue }) => {
  const [input, setInput] = useState('');

  const search = e => {
    e.preventDefault();
    getInputValue(input);
    setInput('');
  };

  const handleChange = e => {
    setInput(e.target.value);
  };

  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={search}>
        <button type="submit" className={s.button}>
          <span className={s.label}>Search</span>
        </button>

        <input
          name="input"
          type="text"
          autoComplete="off"
          onChange={handleChange}
          value={input}
          autoFocus
          placeholder="Search images and photos"
          className={s.input}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  getInputValue: PropTypes.func.isRequired,
};
