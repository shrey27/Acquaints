import './profile.css';
import { Fragment, useState, useEffect } from 'react';
import { ScrollToTop, PageTemplate } from '../../helper';
import Posts from '../homepage/Posts';
import { posts } from '../../utility/constants';

function ProfilePage() {
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
            <button className='btn btn--auth--solid sb'>Edit Profile</button>
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
            <a href='/'>Portfolio Link</a>
          </h1>
        </div>
      </section>
      <Posts posts={posts} />
    </div>
  );
}

export default function Profile() {
  return (
    <Fragment>
      <ScrollToTop />
      <PageTemplate>
        <ProfilePage />
      </PageTemplate>
    </Fragment>
  );
}
