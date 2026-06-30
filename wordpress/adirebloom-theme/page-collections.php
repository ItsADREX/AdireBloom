<?php
/**
 * Collections landing page template.
 *
 * Template Name: Collections Page
 */
get_header();
$collections = adirebloom_collection_cards();
?>

<section class="ab-section ab-page-top ab-section--soft">
    <div class="ab-container ab-section__head ab-section__head--center">
        <p class="ab-label"><?php esc_html_e('Shop by Style', 'adirebloom'); ?></p>
        <h1 class="ab-heading"><?php esc_html_e('Collections', 'adirebloom'); ?></h1>
    </div>
</section>

<section class="ab-section">
    <div class="ab-container ab-collections ab-collections--page">
        <?php foreach ($collections as $card) : ?>
            <a class="ab-collection-card" href="<?php echo esc_url($card['url']); ?>">
                <img src="<?php echo esc_url($card['image']); ?>" alt="<?php echo esc_attr($card['title']); ?>">
                <div class="ab-collection-card__overlay"></div>
                <div class="ab-collection-card__body">
                    <h3><?php echo esc_html($card['title']); ?></h3>
                    <p><?php echo esc_html($card['subtitle']); ?></p>
                    <span><?php esc_html_e('Shop Now', 'adirebloom'); ?> →</span>
                </div>
            </a>
        <?php endforeach; ?>
    </div>
</section>

<?php get_footer(); ?>
