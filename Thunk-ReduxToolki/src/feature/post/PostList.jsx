import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts } from "./postSlice";
import { useEffect } from "react";
import PostExcerpt from "./PostExcerpt";
import LoadingComponent from "../Component/Loading";

const PostList = () => {
    const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch]
    )

    let content;
    if (postStatus === 'loading') {
        content = <LoadingComponent />
        // content = loading({ type: 'balls', color: 'blue' })
        // content = <p>"Loading..."</p>
    } else if (postStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = orderedPosts.map(post => <PostExcerpt key={post.id} post={post} />)
    } else if (postStatus === 'failed') {
        content = <p>{error}</p>
    }


    return (
        <section>
            <h1>Post List</h1>
            {content}
        </section>
    )
}

export default PostList