import './index.css';
import PostList from './feature/post/PostList';
import AddPostFrom from './feature/post/AddPostFrom';

function App() {
  return (
    <main className="App">
      <AddPostFrom/>
      <PostList />

    </main>
  );
}

export default App;
