{
  // method to submit tha form using ajax
  let createPost = function () {
    let newPostForm = $("#new-post-form");

    newPostForm.submit((e) => {
      e.preventDefault();

      $.ajax({
        type: "POST",
        url: "/post/create-post",
        data: newPostForm.serialize(),
        success: function (data) {
          console.log(data);
          let newPost = newPostDom(data.data.post);
          $("#posts-list-container").prepend(newPost);
          deletePost($(" .delete-post-button", newPost));
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  let newPostDom = function (post) {
    return $(`<div class="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4" id="post-${
      post._id
    }">
    <!-- User Profile Image -->
    <div class="flex-shrink-0">
      <img class="h-10 w-10 rounded-full" src="https://ui-avatars.com/api/?name=${
        post.user.name
      }&background=random" alt="User Avatar">
    </div>
    <!-- Post Content -->
    <div class="flex-1">
      <!-- Delete Button -->
      <div class="flex justify-between items-center">
        <div class="text-lg font-semibold text-gray-900">${post.user.name}</div>
       
          <form action="/post/destroy/${
            post._id
          }" method="post" onsubmit="return confirm('Are you sure you want to delete this post?');">
            <button type="submit" class="text-red-500 hover:text-red-700">
              <i class="fa-solid fa-trash"></i> Delete
            </button>
          </form>
       
      </div>

      <p class="text-gray-700 mt-1 mb-2">${post.content}</p>
      <div class="text-sm text-gray-500">
       ${new Date(post.createdAt).toLocaleString()}
      </div>

      <!-- Comment Section -->
     
      
        <form action="/comment/create-comment" method="post" class="flex space-x-2">
          <input type="hidden" name="post" value="${post._id}">
          <input 
            type="text" 
            name="content" 
            placeholder="Write a comment..." 
            required 
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
          <input 
            type="submit" 
            value="Add" 
            class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
          >
        </form>
     
    </div>
  </div>`);
  };

  let deletePost = function (deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          $(`#post-${data.data.post._id}`).remove();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  createPost();
}

// console.log("data");
