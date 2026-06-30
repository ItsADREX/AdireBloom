<?php
get_header();
?>

<section class="ab-section ab-page-top">
    <div class="ab-container">
        <?php if (have_posts()) : ?>
            <header class="ab-section__head">
                <h1 class="ab-heading"><?php esc_html_e('Blog', 'adirebloom'); ?></h1>
            </header>
            <div class="ab-posts">
                <?php while (have_posts()) : the_post(); ?>
                    <article <?php post_class('ab-post-card'); ?>>
                        <?php if (has_post_thumbnail()) : ?>
                            <a href="<?php the_permalink(); ?>"><?php the_post_thumbnail('medium_large'); ?></a>
                        <?php endif; ?>
                        <div>
                            <p class="ab-label"><?php echo esc_html(get_the_date()); ?></p>
                            <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                            <p><?php echo esc_html(wp_trim_words(get_the_excerpt(), 24)); ?></p>
                            <a class="ab-link" href="<?php the_permalink(); ?>"><?php esc_html_e('Read More', 'adirebloom'); ?> →</a>
                        </div>
                    </article>
                <?php endwhile; ?>
            </div>
            <?php the_posts_pagination(); ?>
        <?php else : ?>
            <p><?php esc_html_e('No posts yet.', 'adirebloom'); ?></p>
        <?php endif; ?>
    </div>
</section>

<?php get_footer(); ?>
