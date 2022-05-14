import { Response } from 'miragejs';
import { formatDate, requiresAuth } from '../utils/authUtils';
// import { v4 as uuid } from 'uuid';

/**
 * All the routes related to post are present here.
 * */

/**
 * This handler handles gets all posts in the db.
 * send GET Request at /api/posts
 * */

export const getAllpostsHandler = function () {
  return new Response(200, {}, { posts: this.db.posts });
};

/**
 * This handler gets post by postId in the db.
 * send GET Request at /api/posts/:postId
 * */

export const getPostHandler = function (schema, request) {
  const postId = request.params.postId;
  try {
    const post = schema.posts.findBy({ _id: postId }).attrs;
    return new Response(200, {}, { post });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error
      }
    );
  }
};

/**
 * This handler gets posts of a user in the db.
 * send GET Request at /api/posts/user/:userId
 * */

export const getAllUserPostsHandler = function (schema, request) {
  const { userId } = request.params;
  try {
    const posts = schema.posts.where({ userId })?.models;
    return new Response(200, {}, { posts });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error
      }
    );
  }
};

/**
 * This handler handles creating a post in the db.
 * send POST Request at /api/user/posts/
 * body contains {content}
 * */

export const createPostHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: [
            'The username you entered is not Registered. Not Found error'
          ]
        }
      );
    }
    const { postData } = JSON.parse(request.requestBody);
    const savedPosts = this.db.posts;
    const post = {
      _id: 'P' + (savedPosts.length + 1),
      ...postData,
      likes: {
        likeCount: 0,
        likedBy: [],
        dislikedBy: []
      },
      comments: [],
      bookmarked: false,
      username: user.username,
      createdAt: formatDate(),
      updatedAt: formatDate(),
      dateOfCreation: Date.parse(new Date())
    };
    this.db.posts.insert(post);
    return new Response(201, {}, { posts: this.db.posts });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error
      }
    );
  }
};

/**
 * This handler handles updating a post in the db.
 * send POST Request at /api/posts/edit/:postId
 * body contains { postData }
 * */
export const editPostHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: [
            'The username you entered is not Registered. Not Found error'
          ]
        }
      );
    }
    const postId = request.params.postId;
    const { postData } = JSON.parse(request.requestBody);
    let post = schema.posts.findBy({ _id: postId }).attrs;
    post = { ...post, ...postData };
    this.db.posts.update({ _id: postId }, post);
    return new Response(201, {}, { posts: this.db.posts });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error
      }
    );
  }
};

/**
 * This handler handles liking a post in the db.
 * send POST Request at /api/posts/like/:postId
 * */

export const likePostHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: [
            'The username you entered is not Registered. Not Found error'
          ]
        }
      );
    }
    const postId = request.params.postId;
    const post = schema.posts.findBy({ _id: postId }).attrs;
    if (post.likes.likedBy.some((currUser) => currUser === user._id)) {
      return new Response(
        400,
        {},
        { errors: ['Cannot like a post that is already liked. '] }
      );
    }
    post.likes.likeCount += 1;
    post.likes.likedBy.push(user._id);
    this.db.posts.update({ _id: postId }, { ...post, updatedAt: formatDate() });
    return new Response(201, {}, { posts: this.db.posts });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error
      }
    );
  }
};

/**
 * This handler handles disliking a post in the db.
 * send POST Request at /api/posts/dislike/:postId
 * */

export const dislikePostHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: [
            'The username you entered is not Registered. Not Found error'
          ]
        }
      );
    }
    const postId = request.params.postId;
    let post = schema.posts.findBy({ _id: postId }).attrs;
    if (post.likes.likeCount === 0) {
      return new Response(
        400,
        {},
        { errors: ['Cannot decrement like less than 0.'] }
      );
    }
    post.likes.likeCount -= 1;
    const updatedLikedBy = post.likes.likedBy.filter(
      (currUser) => currUser !== user._id
    );
    post.likes.dislikedBy.push(user);
    post = { ...post, likes: { ...post.likes, likedBy: updatedLikedBy } };
    this.db.posts.update({ _id: postId }, { ...post, updatedAt: formatDate() });
    return new Response(201, {}, { posts: this.db.posts });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error
      }
    );
  }
};

/**
 * This handler handles deleting a post in the db.
 * send DELETE Request at /api/user/posts/:postId
 * */
export const deletePostHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: [
            'The username you entered is not Registered. Not Found error'
          ]
        }
      );
    }
    const postId = request.params.postId;
    this.db.posts.remove({ _id: postId });
    return new Response(201, {}, { posts: this.db.posts });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error
      }
    );
  }
};

// Post a comment
// add a comment
// reply on a comment
// delete a reply on a comment
// /api/post/comment/:postId

export const commentPostHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: [
            'The username you entered is not Registered. Not Found error'
          ]
        }
      );
    }
    const postId = request.params.postId;
    const { comment } = JSON.parse(request.requestBody);
    const post = schema.posts.findBy({ _id: postId }).attrs;

    if (!post.comments.some((item) => item._id === comment._id)) {
      post.comments.push(comment);
    } else {
      const newComments = post.comments.reduce(
        (acc, curr) =>
          curr._id === comment._id ? [...acc, { ...comment }] : [...acc, curr],
        []
      );
      post.comments = newComments;
    }

    this.db.posts.update({ _id: postId }, { ...post, updatedAt: formatDate() });
    return new Response(201, {}, { posts: this.db.posts });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error
      }
    );
  }
};

// Post a comment
// /api/post/commentdelete/:postId

export const commentDeleteHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: [
            'The username you entered is not Registered. Not Found error'
          ]
        }
      );
    }
    const postId = request.params.postId;
    const commentId = request.params.commentId;
    const post = schema.posts.findBy({ _id: postId }).attrs;
    const newComments = post.comments.filter((item) => item._id !== commentId);
    post.comments = newComments;
    this.db.posts.update({ _id: postId }, { ...post, updatedAt: formatDate() });
    return new Response(201, {}, { posts: this.db.posts });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error
      }
    );
  }
};
