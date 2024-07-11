export function fetchPosts(listNum) {
    return fetch(`/posts/${listNum.queryKey[1]}`).then(response => response.json())
}

export function fetchPost(postId) {
    return fetch(`http://43.201.255.10:8080/post/${postId}`).then(response => response.json())
}


