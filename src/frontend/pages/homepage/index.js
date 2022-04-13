import './homepage.css';
import { Sidebar } from '../../components';
import { posts } from '../../utility/constants';

export default function Homepage() {
  return (
    <div className='main__grid'>
      <Sidebar />
      <div className='main'>
        {posts.map((elem) => {
          return (
            <div key={elem._id} className='post'>
              <div className='post__header'>
                <img src={elem.profilePic} alt='profilepic' />
                <div>
                  <h1>{elem.username}</h1>
                  <h2>{elem.userId}</h2>
                </div>
              </div>
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
              <div className='post__cta'>
                <span>
                  <i
                    className={`${
                      elem.likes
                        ? 'fa-solid fa-heart liked'
                        : 'fa-regular fa-heart'
                    } `}
                  ></i>{' '}
                  {elem.likes > 0 ? elem.likes : ''}
                </span>
                <span>
                  <i className='fa-regular fa-comment'></i>{' '}
                  {elem.comments > 0 ? elem.comments : ''}
                </span>
                <span>
                  <i
                    className={`${
                      elem.bookmarked
                        ? 'fa-solid fa-bookmark'
                        : 'fa-regular fa-bookmark'
                    } `}
                  ></i>{' '}
                  {elem.bookmarked}
                </span>
                <span>
                  <i className='fa-solid fa-share-nodes'></i>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}