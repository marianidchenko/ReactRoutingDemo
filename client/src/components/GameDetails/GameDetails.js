import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import * as gameService from "../../services/gameService"

export const GameDetails = ({ games, addComment }) => {
    const { gameId } = useParams();
    const [currentGame, setCurrentGame] = useState({});
    const [comment, setComment] = useState({
        username: '',
        comment: '',
    });

    const [error, setError] = useState({
        username: '',
        comment: '',
    })

    useEffect(() => {
        gameService.getOne(gameId)
        .then(result => {
            setCurrentGame(result)
        })
    }, [])


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
                    <img className="game-img" src={currentGame.imageUrl} />
                    <h1>{currentGame.title}</h1>
                    <span className="levels">MaxLevel: {currentGame.maxLevel}</span>
                    <p className="type">{currentGame.category}</p>
                </div>
                <p className="text">
                    {currentGame.summary}
                </p>
                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {currentGame.comments?.map(x =>
                            <li className="comment">
                                <p>{x}</p>
                            </li>
                        )}
                    </ul>

                    {!currentGame.comments &&
                        <p className="no-comment">No comments.</p>
                    }
                </div>

                <div className="buttons">
                    <Link to={`/games/${currentGame._id}/edit`} className="button">
                        Edit
                    </Link>
                    <Link to="#" className="button">
                        Delete
                    </Link>
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