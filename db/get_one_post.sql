select title, content, hp.image as post_image, username, hu.image as user_image from helo_posts hp
join helo_users hu on hu.user_id = hp.author_id
where post_id = $1