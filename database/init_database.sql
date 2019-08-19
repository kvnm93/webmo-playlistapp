create database webmo;
use webmo;


create table if not exists user (
  id int unsigned not null auto_increment,
  username varchar(100) not null,
  first_name varchar(100) not null,
  last_name varchar(100) not null,
  password varchar(100) not null,
  created DATE,
  primary key(id),
  unique(username)
);

create table if not exists role (
  id int unsigned not null auto_increment,
  role varchar(100) not null,
  primary key(id),
  unique(role)
);

create table if not exists user_role (
  user_id int unsigned not null,
  role_id int unsigned not null,
  unique(user_id, role_id),
  index(user_id)
);


create table if not exists song (
  id int unsigned not null auto_increment,
  title varchar(100) not null,
  artist varchar(100) not null,
  genre varchar(100) not null,
  length int(11) not null,
  album varchar(100) not null,
  primary key(id)
);


# Playlist
create table if not exists playlist (
  id int unsigned not null auto_increment,
  creator int unsigned not null,
  name varchar(100) not null,
  description varchar(100) not null,
  primary key (id),
  FOREIGN KEY (creator) REFERENCES user(id)
);

# Follower of playlist
create table if not exists playlist_user (
  playlist_id int unsigned not null,
  user_id int unsigned not null,
  unique(playlist_id, user_id),
  index(playlist_id)
);


# Songs in Playlist
create table if not exists playlist_song (
  playlist_id int unsigned not null,
  song_id int unsigned not null,
  unique(playlist_id, song_id),
  index(playlist_id)
);


INSERT INTO role (id, role) VALUES (1, 'ADMIN');
INSERT INTO role (id, role) VALUES (2, 'LISTENER');


