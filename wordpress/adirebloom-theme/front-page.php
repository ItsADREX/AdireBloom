<?php
/**
 * Front page template.
 */
get_header();
$slides = adirebloom_hero_slides();
$collections = adirebloom_collection_cards();
?>

<section class="ab-hero" aria-label="<?php esc_attr_e('Featured collections', 'adirebloom'); ?>">
    <div class="ab-hero__slides">
        <?php foreach ($slides as $index => $slide) : ?>
            <article class="ab-hero__slide<?php echo $index === 0 ? ' is-active' : ''; ?>" data-slide="<?php echo esc_attr($index); ?>">
                <img src="<?php echo esc_url($slide['image']); ?>" alt="" class="ab-hero__image">
                <div class="ab-hero__overlay"></div>
                <div class="ab-container ab-hero__content">
                    <p class="ab-label"><?php echo esc_html($slide['label']); ?></p>
                    <h1 class="ab-hero__title"><?php echo esc_html($slide['title']); ?></h1>
                    <p class="ab-hero__text"><?php echo esc_html($slide['description']); ?></p>
                    <div class="ab-hero__actions">
                        <a class="ab-btn ab-btn--primary" href="<?php echo esc_url($slide['primary']['url']); ?>"><?php echo esc_html($slide['primary']['label']); ?></a>
                        <a class="ab-btn ab-btn--outline ab-btn--light" href="<?php echo esc_url($slide['secondary']['url']); ?>"><?php echo esc_html($slide['secondary']['label']); ?></a>
                    </div>
                </div>
            </article>
        <?php endforeach; ?>
    </div>
    <div class="ab-hero__dots" aria-hidden="true">
        <?php foreach ($slides as $index => $slide) : ?>
            <button type="button" class="ab-hero__dot<?php echo $index === 0 ? ' is-active' : ''; ?>" data-slide-to="<?php echo esc_attr($index); ?>"></button>
        <?php endforeach; ?>
    </div>
</section>

<div class="ab-ticker">
    <div class="ab-ticker__track">
        <?php
        $items = ['Handcrafted Adire', 'Bespoke Wears', 'Tie & Dye Fabrics', 'Batik Artistry', 'Heritage Gowns', 'Made in Nigeria'];
        for ($i = 0; $i < 3; $i++) :
            foreach ($items as $item) :
                ?>
                <span><?php echo esc_html($item); ?> <span class="ab-ticker__sep">◆</span></span>
                <?php
            endforeach;
        endfor;
        ?>
    </div>
</div>

<section class="ab-section ab-section--soft">
    <div class="ab-container">
        <div class="ab-section__head ab-section__head--center">
            <p class="ab-label"><?php esc_html_e('Curated for You', 'adirebloom'); ?></p>
            <h2 class="ab-heading"><?php esc_html_e('Explore Our Collections', 'adirebloom'); ?></h2>
        </div>
        <div class="ab-collections">
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
    </div>
</section>

<section class="ab-section">
    <div class="ab-container">
        <div class="ab-section__head">
            <div>
                <p class="ab-label"><?php esc_html_e('Hand-Picked', 'adirebloom'); ?></p>
                <h2 class="ab-heading"><?php esc_html_e('Featured Pieces', 'adirebloom'); ?></h2>
            </div>
            <a class="ab-link" href="<?php echo esc_url(adirebloom_shop_url()); ?>"><?php esc_html_e('View All', 'adirebloom'); ?> →</a>
        </div>

        <?php if (function_exists('wc_get_products')) : ?>
            <?php
            $featured = wc_get_products([
                'limit'    => 4,
                'featured' => true,
                'status'   => 'publish',
            ]);
            if (empty($featured)) {
                $featured = wc_get_products(['limit' => 4, 'status' => 'publish']);
            }
            ?>
            <ul class="ab-products">
                <?php foreach ($featured as $product) : ?>
                    <li><?php wc_get_template_part('content', 'product'); ?></li>
                <?php endforeach; ?>
            </ul>
        <?php else : ?>
            <p class="ab-note"><?php esc_html_e('Install WooCommerce and import products to show featured pieces here.', 'adirebloom'); ?></p>
        <?php endif; ?>
    </div>
</section>

<section class="ab-section ab-section--dark">
    <div class="ab-container ab-split">
        <div class="ab-split__media">
            <img src="<?php echo esc_url(adirebloom_asset('about-fabric-1.jpg')); ?>" alt="<?php esc_attr_e('Adire craftsmanship', 'adirebloom'); ?>">
        </div>
        <div>
            <p class="ab-label"><?php esc_html_e('Heritage Craft', 'adirebloom'); ?></p>
            <h2 class="ab-heading ab-heading--light"><?php esc_html_e('Every Pattern Tells a Story', 'adirebloom'); ?></h2>
            <p class="ab-copy ab-copy--light">From resist-dye techniques passed down through generations to garments designed for today — AdireBloom celebrates Nigerian textile artistry without compromise.</p>
            <a class="ab-btn ab-btn--primary" href="<?php echo esc_url(home_url('/about/')); ?>"><?php esc_html_e('Discover Our Story', 'adirebloom'); ?></a>
        </div>
    </div>
</section>

<section class="ab-section ab-section--soft">
    <div class="ab-container ab-trust">
        <?php
        $trust = [
            ['title' => 'Authentic Adire', 'body' => 'Every piece is handcrafted using genuine resist-dye techniques passed down through generations.'],
            ['title' => 'Premium Quality', 'body' => 'We source only the finest Nigerian cotton and silk to ensure your garment ages beautifully.'],
            ['title' => 'Nationwide Delivery', 'body' => 'Careful packaging and reliable delivery to every state in Nigeria, with tracking included.'],
            ['title' => 'Easy Returns', 'body' => 'Not quite right? Return within 14 days for a full refund or exchange — no questions asked.'],
        ];
        foreach ($trust as $item) :
            ?>
            <article class="ab-trust__item">
                <h3><?php echo esc_html($item['title']); ?></h3>
                <p><?php echo esc_html($item['body']); ?></p>
            </article>
        <?php endforeach; ?>
    </div>
</section>

<?php get_footer(); ?>
