import Posts from '../homepage/Posts';
import { posts } from '../../utility/constants';
import { SETTINGS } from '../../routes';
import { Link } from 'react-router-dom';

export default function MyProfile() {
  return (
    <div className='profile'>
      <section className='profile__box'>
        <div className='profile__image'>
          <img
            src='https://www.w3schools.com/w3images/avatar2.png'
            alt='profilePic'
          />
        </div>
        <div className='profile__details'>
          <div className='profile__heading'>
            <h1>John Doe</h1>
            <Link to={SETTINGS} className='btn btn--auth--solid sb'>
              Edit Profile
            </Link>
          </div>
          <h2 className='profile__userId'>@johnDoes1234</h2>
          <div className='profile__posts'>
            <span>
              <strong>4</strong> Posts
            </span>
            <span>
              <strong>5</strong> Followers
            </span>
            <span>
              <strong>3</strong> Following
            </span>
          </div>
          <p className='profile__paragraph'>This is my bio</p>
          <h1 className='profile__link'>
            <a href='https://github.com/shrey27'>Portfolio Link</a>
          </h1>
        </div>
      </section>
      <section className='post profile__options'>
        <span className='profile__option chosen'>
          <i class='fa-regular fa-clone'></i> Posts
        </span>
        <span className='profile__option'>
          <i class='fa-regular fa-heart'></i> Likes
        </span>
        <span className='profile__option'>
          <i class='fa-regular fa-comment'></i> Comments
        </span>
      </section>
      <Posts posts={posts} />
    </div>
  );
}
