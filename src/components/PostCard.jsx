

const PostCard=({title,body})=>{

    /*
{
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  }

 */
  return(
    <div style={{border:'1px solid #ccc',padding:'10px', borderRadius:'10px',}}>

        <h2 style={{fontWeight:'bold'}}>{title}</h2>

        <p style={{wordSpacing:'2px',lineHeight:'1.5',overflow:'hidde'}}>{body}</p>

        <button>View post</button>
    </div>
  )
}

export default PostCard;