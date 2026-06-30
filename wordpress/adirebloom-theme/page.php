<?php
get_header();
?>

<section class="ab-section ab-page-top">
    <div class="ab-container">
        <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
            <article <?php post_class('ab-content'); ?>>
                <h1 class="ab-heading"><?php the_title(); ?></h1>
                <div class="ab-copy"><?php the_content(); ?></div>
            </article>
        <?php endwhile; endif; ?>
    </div>
</section>

<?php get_footer(); ?>
