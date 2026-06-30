<?php
/**
 * Header template.
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="ab-header" id="site-header">
    <div class="ab-container ab-header__inner">
        <a class="ab-brand" href="<?php echo esc_url(home_url('/')); ?>">
            <img src="<?php echo esc_url(adirebloom_asset('logo.png')); ?>" alt="<?php bloginfo('name'); ?>" class="ab-brand__logo">
            <span class="ab-brand__text">
                <span class="ab-brand__name"><?php bloginfo('name'); ?></span>
                <span class="ab-brand__tagline">Wear Heritage, Bloom with Style</span>
            </span>
        </a>

        <nav class="ab-nav ab-nav--desktop" aria-label="<?php esc_attr_e('Primary', 'adirebloom'); ?>">
            <?php adirebloom_primary_nav(); ?>
        </nav>

        <div class="ab-header__actions">
            <?php if (is_user_logged_in()) : ?>
                <span class="ab-header__greeting"><?php printf(esc_html__('Hi, %s', 'adirebloom'), esc_html(wp_get_current_user()->first_name ?: wp_get_current_user()->display_name)); ?></span>
                <a class="ab-icon-btn" href="<?php echo esc_url(wp_logout_url(home_url('/'))); ?>" aria-label="<?php esc_attr_e('Sign out', 'adirebloom'); ?>">↪</a>
            <?php else : ?>
                <a class="ab-header__signin" href="<?php echo esc_url(adirebloom_account_url()); ?>"><?php esc_html_e('Sign In', 'adirebloom'); ?></a>
            <?php endif; ?>

            <a class="ab-icon-btn ab-cart-btn" href="<?php echo esc_url(adirebloom_cart_url()); ?>" aria-label="<?php esc_attr_e('Cart', 'adirebloom'); ?>">
                🛍
                <?php $count = adirebloom_cart_count(); if ($count > 0) : ?>
                    <span class="ab-cart-count"><?php echo esc_html($count > 9 ? '9+' : $count); ?></span>
                <?php endif; ?>
            </a>

            <button class="ab-menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="<?php esc_attr_e('Toggle menu', 'adirebloom'); ?>">☰</button>
        </div>
    </div>

    <nav class="ab-nav ab-nav--mobile" id="mobile-nav" aria-label="<?php esc_attr_e('Mobile', 'adirebloom'); ?>" hidden>
        <?php adirebloom_primary_nav(); ?>
        <div class="ab-nav__mobile-actions">
            <a href="<?php echo esc_url(adirebloom_account_url()); ?>"><?php esc_html_e('My Account', 'adirebloom'); ?></a>
            <a href="<?php echo esc_url(adirebloom_cart_url()); ?>"><?php esc_html_e('Cart', 'adirebloom'); ?></a>
        </div>
    </nav>
</header>

<main class="ab-main">
