import { Fragment } from 'react/cjs/react.production.min';
import './homepage.css';
import { Link } from 'react-router-dom';
import { useAuthCtx, useTheme } from '../../context';
import { deletePost, fetchUserPosts } from '../../service';
import { useDispatch } from 'react-redux';

export default function Posts({ posts, myProfile }) {
  const { token } = useAuthCtx();
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const handlePostDelete = (postId, username) => {
    dispatch(deletePost(postId, token));
    dispatch(fetchUserPosts(username));
  };
  return (
    <Fragment>
      {posts.map((elem) => {
        return (
          <div
            key={elem._id}
            className={`post ${theme === 'dark' && 'darktheme'}`}
          >
            <Link to={`/profile/${elem.username}`}>
              <div className='post__header'>
                <img src={elem.profilePic} alt='profilepic' />
                <div>
                  <h1>{elem.username}</h1>
                  <h2>{elem.userId}</h2>
                </div>
              </div>
            </Link>
            <Link to={`/posts/${elem._id}`} className='text'>
              {elem.banner && (
                <div className='post__banner__ctr'>
                  <img
                    src={elem.banner}
                    className='post__banner'
                    alt='banner'
                  />
                </div>
              )}
              <h1 className='post__title'>{elem.title}</h1>
              <p className='post__paragraph'>{elem.description}</p>
            </Link>
            {myProfile ? (
              <div className='post__cta'>
                <span>
                  <i
                    className={`
                   tertiary ${
                     elem.likes
                       ? 'fa-solid fa-heart liked'
                       : 'fa-regular fa-heart'
                   } `}
                  ></i>{' '}
                  {elem.likes > 0 ? elem.likes : ''}
                </span>
                <Link to={`/${elem._id}`} className='text'>
                  <span>
                    <i className='tertiary fa-regular fa-comment'></i>{' '}
                    {elem.comments > 0 ? elem.comments : ''}
                  </span>
                </Link>
                <span>
                  <i className='tertiary fa-solid fa-share-nodes'></i>
                </span>
                <span
                  onClick={handlePostDelete.bind(this, elem._id, elem.username)}
                >
                  <i className='tertiary fa-solid fa-trash'></i>
                </span>
              </div>
            ) : (
              <div className='post__cta'>
                <span>
                  <i
                    className={`
                      tertiary ${
                        elem.likes
                          ? 'fa-solid fa-heart liked'
                          : 'fa-regular fa-heart'
                      } `}
                  ></i>{' '}
                  {elem.likes > 0 ? elem.likes : ''}
                </span>
                <Link to={`/${elem._id}`} className='text'>
                  <span>
                    <i className='tertiary fa-regular fa-comment'></i>{' '}
                    {elem.comments > 0 ? elem.comments : ''}
                  </span>
                </Link>
                <span>
                  <i
                    className={`tertiary ${
                      elem.bookmarked
                        ? 'fa-solid fa-bookmark'
                        : 'fa-regular fa-bookmark'
                    } `}
                  ></i>{' '}
                  {elem.bookmarked}
                </span>
                <span>
                  <i className='tertiary fa-solid fa-share-nodes'></i>
                </span>
              </div>
            )}
          </div>
        );
      })}
    </Fragment>
  );
}
