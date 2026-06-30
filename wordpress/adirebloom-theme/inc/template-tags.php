<?php
if (!defined('ABSPATH')) {
    exit;
}

function adirebloom_primary_nav() {
    if (has_nav_menu('primary')) {
        wp_nav_menu([
            'theme_location' => 'primary',
            'container'      => false,
            'menu_class'     => 'ab-nav__list',
            'fallback_cb'    => false,
        ]);
        return;
    }

    $links = [
        ['url' => home_url('/'), 'label' => 'Home'],
        ['url' => adirebloom_shop_url(), 'label' => 'Shop'],
        ['url' => home_url('/collections/'), 'label' => 'Collections'],
        ['url' => get_post_type_archive_link('post') ?: home_url('/blog/'), 'label' => 'Blog'],
        ['url' => home_url('/about/'), 'label' => 'About'],
        ['url' => home_url('/contact/'), 'label' => 'Contact'],
    ];

    echo '<ul class="ab-nav__list">';
    foreach ($links as $link) {
        $active = trailingslashit($link['url']) === trailingslashit((is_ssl() ? 'https://' : 'http://') . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']) ? ' is-active' : '';
        printf(
            '<li><a class="ab-nav__link%s" href="%s">%s</a></li>',
            esc_attr($active),
            esc_url($link['url']),
            esc_html($link['label'])
        );
    }
    echo '</ul>';
}

function adirebloom_cart_count() {
    if (!function_exists('WC') || !WC()->cart) {
        return 0;
    }
    return WC()->cart->get_cart_contents_count();
}

function adirebloom_cart_url() {
    return function_exists('wc_get_cart_url') ? wc_get_cart_url() : home_url('/cart/');
}

function adirebloom_account_url() {
    return function_exists('wc_get_page_permalink') ? wc_get_page_permalink('myaccount') : wp_login_url();
}

function adirebloom_hero_slides() {
    return [
        [
            'image'       => adirebloom_asset('hero.jpg'),
            'label'       => 'New Arrivals — Season Collection',
            'title'       => 'Adire for Every Occasion',
            'description' => 'Handcrafted heritage wear rooted in Yoruba artistry. Each piece carries the soul of a tradition — curated for the modern African.',
            'primary'     => ['label' => 'Explore Collection', 'url' => adirebloom_shop_url()],
            'secondary'   => ['label' => 'Our Story', 'url' => home_url('/about/')],
        ],
        [
            'image'       => adirebloom_asset('collection-nxt1.jpg'),
            'label'       => 'Bespoke Wears',
            'title'       => 'Tailored to Your Story',
            'description' => 'From ceremony kaftans to everyday statement pieces — bespoke Adire made to your measure, yours alone.',
            'primary'     => ['label' => 'Shop Bespoke', 'url' => adirebloom_shop_url('bespoke-wears')],
            'secondary'   => ['label' => 'View Collections', 'url' => home_url('/collections/')],
        ],
        [
            'image'       => adirebloom_asset('collection-nxt2.jpg'),
            'label'       => 'Ceremonial Gowns',
            'title'       => 'Elegance in Every Drape',
            'description' => 'Floor-length silhouettes for celebrations and milestones. Tie-dye artistry that turns every entrance into a statement.',
            'primary'     => ['label' => 'Shop Gowns', 'url' => adirebloom_shop_url('gowns')],
            'secondary'   => ['label' => 'Featured Pieces', 'url' => adirebloom_shop_url()],
        ],
        [
            'image'       => adirebloom_asset('about-fabric-2.jpg'),
            'label'       => 'Adire Fabrics',
            'title'       => 'Authentic Textiles by the Yard',
            'description' => 'Premium tie-and-dye fabrics for designers, tailors, and makers who want genuine Nigerian Adire at the source.',
            'primary'     => ['label' => 'Shop Fabrics', 'url' => adirebloom_shop_url('tie-dye-fabrics')],
            'secondary'   => ['label' => 'Contact Us', 'url' => home_url('/contact/')],
        ],
    ];
}

function adirebloom_collection_cards() {
    return [
        ['title' => 'Bespoke Wears', 'subtitle' => 'Made to your measure, yours alone', 'image' => adirebloom_asset('collection-nxt1.jpg'), 'url' => adirebloom_shop_url('bespoke-wears')],
        ['title' => 'Gowns', 'subtitle' => 'Ceremonial elegance, modern drape', 'image' => adirebloom_asset('collection-nxt2.jpg'), 'url' => adirebloom_shop_url('gowns')],
        ['title' => 'Batik', 'subtitle' => 'Hand-waxed patterns, rich colour', 'image' => adirebloom_asset('products/floral-design.jpg'), 'url' => adirebloom_shop_url('batik')],
        ['title' => 'Tie & Dye Fabrics', 'subtitle' => 'Authentic Adire textiles by the yard', 'image' => adirebloom_asset('about-fabric-2.jpg'), 'url' => adirebloom_shop_url('tie-dye-fabrics')],
    ];
}
