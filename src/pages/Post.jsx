import PostCard from "../components/PostCard";

const Post = () => {
  return (
    <div style={{border:'1px solid #333',borderRadius:'5px',minHeight:'500px' ,padding:'20px',margin:'10px'}}>
        <h2 style={{fontSize:'30px',textAlign:'center'}}>Available post</h2>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>

      <PostCard
        title="AI for Future education"
        body="quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      />
      <PostCard
        title="AI for Future education"
        body="quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      />
      <PostCard
        title="AI for Future education"
        body="quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      />
      <PostCard
        title="AI for Future education"
        body="quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      />
    </div>
    </div>
  );
};

export default Post;