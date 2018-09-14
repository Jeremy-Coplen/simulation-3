select post_id, title,  hu.image as image, post_id, username from helo_posts hp
join helo_users hu on hu.user_id = hp.author_id
where author_id = $1