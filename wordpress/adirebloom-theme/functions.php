<?php
/**
 * AdireBloom theme setup.
 */

if (!defined('ABSPATH')) {
    exit;
}

define('ADIREBLOOM_VERSION', '1.0.0');
define('ADIREBLOOM_DIR', get_template_directory());
define('ADIREBLOOM_URI', get_template_directory_uri());

function adirebloom_setup() {
    load_theme_textdomain('adirebloom', ADIREBLOOM_DIR . '/languages');

    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script']);
    add_theme_support('woocommerce', [
        'thumbnail_image_width' => 600,
        'single_image_width'    => 800,
        'product_grid'          => [
            'default_rows'    => 3,
            'min_rows'        => 1,
            'default_columns' => 4,
            'min_columns'     => 2,
            'max_columns'     => 4,
        ],
    ]);

    register_nav_menus([
        'primary' => __('Primary Menu', 'adirebloom'),
        'footer'  => __('Footer Menu', 'adirebloom'),
    ]);
}
add_action('after_setup_theme', 'adirebloom_setup');

function adirebloom_scripts() {
    wp_enqueue_style(
        'adirebloom-fonts',
        'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@400;500;600&display=swap',
        [],
        null
    );
    wp_enqueue_style('adirebloom-main', ADIREBLOOM_URI . '/assets/css/main.css', ['adirebloom-fonts'], ADIREBLOOM_VERSION);
    wp_enqueue_script('adirebloom-main', ADIREBLOOM_URI . '/assets/js/main.js', [], ADIREBLOOM_VERSION, true);
}
add_action('wp_enqueue_scripts', 'adirebloom_scripts');

function adirebloom_body_classes($classes) {
    if (is_front_page()) {
        $classes[] = 'ab-home';
    }
    return $classes;
}
add_filter('body_class', 'adirebloom_body_classes');

function adirebloom_asset($file) {
    return ADIREBLOOM_URI . '/assets/images/' . ltrim($file, '/');
}

function adirebloom_shop_url($category = '') {
    $url = function_exists('wc_get_page_permalink') ? wc_get_page_permalink('shop') : home_url('/shop/');
    if ($category) {
        $term = get_term_by('slug', $category, 'product_cat');
        if ($term && !is_wp_error($term)) {
            return get_term_link($term);
        }
        return add_query_arg('product_cat', $category, $url);
    }
    return $url;
}

require_once ADIREBLOOM_DIR . '/inc/template-tags.php';
