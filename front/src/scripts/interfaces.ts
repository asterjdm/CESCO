export interface Post {
    ID: string;
    content: string;
    date: string;
    USER_FK: string;
    author: string;
    author_profile_picture: string;
    author_grade: string;
    votes_positives_count: string;
    votes_neutrals_count: string;
    votes_negatives_count: string;
    comments: PostComment[];
}
  
export interface PostComment {
    COMMENT_ID: string;
    USER_FK: string;
    content: string;
    POST_FK: string;
    datetime: string;
    author: string;
    author_profile_picture: string;
    author_grade: string;
}
  