// creating styles
import { ReactPropTypes } from "react";
import PropTypes from 'prop-types'

const Book = ({ id, name, author, year, url, finished, clickBookFinished }) => {
    return (
        <div className='p-10 m-5 bg-red-300 text-black'>
            <div>
                <p>{name}</p>
                <p>{author}</p>
                <p>{year}</p>
                <p>{url}</p>
                <span>
                    {
                        finished === 'false' ? (
                            <button className='px-10 py-2 font-bold bg-white text-blue-700' onClick={() => clickBookFinished(id)}>
                                Finish Book
                            </button>
                        ) :
                            (
                                <p className="p-2 text-black font-bold">Book Finished</p>
                            )
                    }
                </span>
            </div>

        </div>
    );
}

Book.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    finished: PropTypes.string.isRequired,
}

export default Book;