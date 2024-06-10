/* eslint-disable react/prop-types */
const Post = ({ post }) => {
  const url = post.picture ? post.picture : "https://via.placeholder.com/150";

  const addEllipsis = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + "..." : str;
  };

  return (
    <div className="border rounded-md m-3 flex items-center flex-col h-[350px]">
      <img src={url} alt="post" />
      <h1 className="text-lg font-semibold">{addEllipsis(post.title, 20)}</h1>
      <p className="text-sm text-slate-300">{addEllipsis(post.body, 50)}</p>
      <div className="flex justify-between w-full p-2">
        <span>{post.author}</span>
        <span>{new Date(post.createdAt).toDateString()}</span>
      </div>
    </div>
  );
};

export default Post;
