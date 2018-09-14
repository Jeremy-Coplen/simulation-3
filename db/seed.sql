create table helo_users (
    user_id serial primary key,
    username varchar(30) not null unique,
    password varchar(30) not null,
    image text
);

create table helo_posts (
    post_id serial primary key
);