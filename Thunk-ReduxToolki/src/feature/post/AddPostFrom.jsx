import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNewPost } from "./postSlice";
import { selectAllUsers } from "../users/userSlice";

const AddPostFrom = () => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [userId, setUserId] = useState("")
    const [addRequestStatus, setaddRequestStatus] = useState('idle')

    const users = useSelector(selectAllUsers);

    const onTitleChanged = e => setTitle(e.target.value)
    const onBodyChanged = e => setBody(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)


    const canSave = [title, body, userId].every(Boolean) && addRequestStatus === 'idle';

    const onSavePostClicked = () => {
        // if (title && body) {
        //     dispatch(
        //         addPost(title, body, userId)
        //     );
        //     setTitle('')
        //     setBody('')
        // }

        if (canSave) {
            try {
                setaddRequestStatus('pending')
                dispatch(addNewPost({ title, body, userId })).unwrap()

                setTitle('')
                setBody('')
                setUserId('')
            }
            catch (error) {
                console.error('Failed to save the post', error)
            }
            finally {
                setaddRequestStatus('idle')
            }
        }
    };

    const onCancelClicked = () => {
        setTitle('')
        setBody('')
        setUserId('')
    };





    const userOption = users.map(user => (
        <option
            key={user.id} value={user.id}>
            {user.name}
        </option>
    ));

    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postTitle">Author:</label>
                <select
                    id="postAuthor"
                    value={userId}
                    onChange={onAuthorChanged}>
                    <option value=""></option>
                    {userOption}
                </select>

                <label htmlFor="postBody">Content:</label>
                <textarea
                    id="postBody"
                    name="postBody"
                    value={body}
                    onChange={onBodyChanged}
                />

                <button
                    type="submit"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >
                    Add Post
                </button>
                <button
                    type="cancel"
                    onClick={onCancelClicked}
                    disabled={!canSave}
                >
                    Clear
                </button>

            </form>
        </section>
    );
};

export default AddPostFrom;