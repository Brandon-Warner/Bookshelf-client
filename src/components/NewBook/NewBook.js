import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { NEW_BOOK } from '../../queries';
import './NewBook.css';

const NewBook = ({ updateCacheWith, show }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [published, setPublished] = useState('');
    const [genre, setGenre] = useState('');
    const [genres, setGenres] = useState([]);

    const [newBook] = useMutation(NEW_BOOK, {
        update: (store, response) => {
            console.log('response from update: ', response);
            updateCacheWith(response.data.addBook);
        }
    });

    if (!show) {
        return null;
    }

    const submit = async event => {
        event.preventDefault();

        newBook({ variables: { title, author, published, genres } });
        console.log('add book...');

        setTitle('');
        setPublished('');
        setAuthor('');
        setGenres([]);
        setGenre('');
    };

    const addGenre = () => {
        setGenres(genres.concat(genre));
        setGenre('');
    };

    return (
        <div className='new-book'>
            <form classname='new-book__form' onSubmit={submit}>
                <div className='new-book__form-item'>
                    title
                    <input
                        className='new-book__form-item__input'
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div className='new-book__form-item'>
                    author
                    <input
                        className='new-book__form-item__input'
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div className='new-book__form-item'>
                    published
                    <input
                        className='new-book__form-item__input'
                        type='number'
                        value={published}
                        onChange={({ target }) => setPublished(Number(target.value))}
                    />
                </div>
                <div className='new-book__form-item'>
                    <input
                        className='new-book__form-item__genre'
                        value={genre}
                        onChange={({ target }) => setGenre(target.value)}
                    />
                    <button className='new-book__form-item__genre-button' onClick={addGenre} type='button'>
                        add genre
                    </button>
                </div>
                <div className='new-book__form-item'>genres: {genres.join(' ')}</div>
                <button className='new-book__form-item__submit-button' type='submit'>create book</button>
            </form>
        </div>
    );
};

export default NewBook;
