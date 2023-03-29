export const usePost = (isPostPage) => {
  const { $generalStore, $userStore } = useNuxtApp();

  const likePost = async (post) => {
    if (!$userStore.id) {
      $generalStore.isLoginOpen = true;
      return;
    }

    try {
      const res = await $userStore.likePost(post.id);
      console.log(res);

      let singlePost = null;

      if (isPostPage) {
        singlePost = post;
      } else {
        singlePost = $generalStore.posts.find((p) => p.id === post.id);
      }
      console.log(singlePost.likes);
      console.log(res);
      singlePost.likes.push(res.data.like);
    } catch (error) {
      console.log(error);
    }
  };

  const unLikePost = async (post) => {
    let deleteLike = null;
    let singlePost = null;

    if (!$userStore.id) {
      $generalStore.isLoginOpen = true;
      return;
    }

    if (isPostPage) {
      singlePost = post;
    } else {
      singlePost = $generalStore.posts.find((p) => p.id === post.id);
    }

    singlePost.likes.forEach((like) => {
      if (like.user_id === $userStore.id) {
        deleteLike = like;
      }
    });

    const res = await $userStore.unlikePost(deleteLike.id);

    for (let i = 0; i < singlePost.likes.length; i++) {
      const like = singlePost.likes[i];
      if (like.id === res.data.like.id) {
        singlePost.likes.splice(i, 1);
      }
    }
  };

  return { likePost, unLikePost };
};
