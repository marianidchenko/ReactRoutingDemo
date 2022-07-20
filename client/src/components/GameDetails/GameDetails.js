import { useState } from "react";
import { useParams } from "react-router-dom";

export const GameDetails = ({ games, addComment }) => {
    const { gameId } = useParams()
    const [comment, setComment] = useState({
        username: '',
        comment: '',
    });

    const [error, setError] = useState({
        username: '',
        comment: '',
    })

    const game = games.find(game => game._id === gameId)

    const addCommentHandler = (e) => {
        e.preventDefault();
        addComment(gameId, `${comment.username}: ${comment.comment}`)
    }

    const onChange = (e) => {
        setComment(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    const validateUsername = (e) => {
        const username = e.target.value;
        if (username.length < 3) {
            setError(state => ({
                ...state,
                'username': 'Username must be at least 3 characters long'
            }))
        }
        else {
            setError(state => ({
                ...state,
                'username': ''
            }))
        };
    }

    const validateComment = (e) => {
        const comment = e.target.value;
        if (comment.length < 5) {
            setError(state => ({
                ...state,
                'comment': 'Comment must be at least 5 characters long'
            }))
        }
        else {
            setError(state => ({
                ...state,
                'comment': ''
            }))
        };
    }

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>
                <p className="text">
                    {game.summary}
                </p>
                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {game.comments?.map(x =>
                            <li className="comment">
                                <p>{x}</p>
                            </li>
                        )}
                    </ul>

                    {!game.comments &&
                        <p className="no-comment">No comments.</p>
                    }
                </div>

                <div className="buttons">
                    <a href="#" className="button">
                        Edit
                    </a>
                    <a href="#" className="button">
                        Delete
                    </a>
                </div>
            </div>

            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={addCommentHandler}>
                    <input
                        type="text" name="username"
                        placeholder="Enter username"
                        onChange={onChange}
                        onBlur={validateUsername}
                        value={comment.username}
                    />
                    {error.username &&
                        <span>{error.username}</span>
                    }
                    <textarea
                        name="comment"
                        placeholder="Comment......"
                        onChange={onChange}
                        onBlur={validateComment}
                        value={comment.comment}
                    />
                    {error.comment &&
                        <span>{error.comment}</span>
                    }
                    <input
                        className="btn submit"
                        type="submit"
                        value="Add Comment"
                    />
                </form>
            </article>
        </section>
    );
}