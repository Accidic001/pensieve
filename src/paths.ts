

const path ={  

home(){
 return "/";
},
showTopics(topicSlug:string){
return `/topics/${topicSlug}`;
},
postCreate(topicSlug:string){
    return `/topics/${topicSlug}/post/new`;
},
postShow(topicSlug:string, postId:string){
    return `/topics/${topicSlug}/post/${postId}`;
},
search(query: string) {
    return `/search?q=${encodeURIComponent(query)}`;},
     topPosts() {
        return '/top-posts';
      }

};

export default path;