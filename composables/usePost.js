export const usePost = (isPostPage) => {
  const { $generalStore, $userStore } = useNuxtApp();
  const router = useRouter();

  const comment = ref(null);

  //SET URL FROM BACK AFTER SHOW A POST
  const displayPost = (backUrl, post) => {
    $generalStore.setBackUrl(backUrl);
    $generalStore.selectedPost = null;

    setTimeout(() => router.push(`/post/${post.id}`), 200);
  };

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

  const addComment = async () => {
    try {
      await $generalStore.addComment(
        $generalStore.selectedPost.id,
        comment.value
      );

      comment.value = null;

      document
        .getElementById("Comments")
        .scroll({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (commentId) => {
    const res = confirm("Are you sure you want to delete this comment?");

    try {
      if (res) {
        await $generalStore.deleteComment(
          $generalStore.selectedPost.id,
          commentId
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async () => {
    const res = confirm("Are you sure you want to delete this comment?");

    try {
      if (res) {
        await $generalStore.deletePost($generalStore.selectedPost.id);
        router.push(`/profile/${$userStore.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    displayPost,
    likePost,
    unLikePost,
    comment,
    addComment,
    deleteComment,
    deletePost,
  };
};
