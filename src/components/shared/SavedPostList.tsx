import { useUserContext } from "@/context/customHook";
import { Models } from "appwrite";
import { Link } from 'react-router-dom'
import PostStats from "./PostStats";

type SavedPostListProps = {
    posts: Models.Document[];
    showUser?: boolean;
    showStats?: boolean;
  };

  const SavedPostList = ({
    posts,
    showUser = true,
    showStats = true,
  }: SavedPostListProps) => {
    const { user } = useUserContext();
  
    return (
      <ul className="grid-container">
        {posts.map((post) => (
          <li key={post.$id} className="relative min-w-80 h-80">
            <Link to={`/posts/${post.$id}`} className="grid-post_link">
              <img
                src={post.imageUrl}
                alt="post"
                className="h-full w-full object-cover"
              />
            </Link>
  
            <div className="grid-post_user">
              {showUser && (
                <div className="flex items-center justify-start gap-2 flex-1">
                  <img
                    src={
                      post.creator.imageUrl ||
                      "/assets/icons/profile-placeholder.svg"
                    }
                    alt="creator"
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="line-clamp-1">{post.creator.name}</p>
                </div>
              )}
              {showStats && <PostStats post={post} userId={user.id} />}
            </div>
          </li>
        ))}
      </ul>
    );
  };

export default SavedPostList;