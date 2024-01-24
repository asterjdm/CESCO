-- Database: cescoDB

-- Table structure for table cesco_posts
CREATE TABLE cesco_posts (
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT NOT NULL,
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  USER_FK INTEGER NOT NULL
);

-- Table structure for table cesco_users
CREATE TABLE cesco_users (
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  grade VARCHAR(20) NOT NULL DEFAULT 'user',
  profile_picture VARCHAR(255)
);

-- Table structure for table cesco_comments
CREATE TABLE cesco_comments (
  COMMENT_ID INTEGER PRIMARY KEY AUTOINCREMENT,
  USER_FK INTEGER NOT NULL,
  content VARCHAR(1000) NOT NULL,
  POST_FK INTEGER NOT NULL,
  datetime DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table structure for table cesco_votes
CREATE TABLE cesco_votes (
  vote_type INTEGER NOT NULL,
  USER_FK INTEGER NOT NULL,
  POST_FK INTEGER NOT NULL
);

-- Table structure for table cesco_reports
CREATE TABLE cesco_reports (
  POST_FK INTEGER NOT NULL,
  reason VARCHAR(500) NOT NULL,
  datetime DATETIME DEFAULT CURRENT_TIMESTAMP,
  count INTEGER NOT NULL,
  ID INTEGER PRIMARY KEY AUTOINCREMENT
);

-- Table structure for table cesco_followers
CREATE TABLE cesco_followers (
  follower_id INTEGER NOT NULL,
  followed_id INTEGER NOT NULL
);
