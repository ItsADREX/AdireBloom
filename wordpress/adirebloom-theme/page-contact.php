<?php
/**
 * Template Name: Contact Page
 */
get_header();
?>

<section class="ab-section ab-section--soft ab-page-top">
    <div class="ab-container ab-section__head ab-section__head--center">
        <h1 class="ab-heading ab-heading--indigo"><?php esc_html_e('Say Hello To Us', 'adirebloom'); ?></h1>
        <p class="ab-copy"><?php esc_html_e('Our mission is to reimagine Adire for every generation — a fusion of heritage, comfort, and Afro-centric style.', 'adirebloom'); ?></p>
    </div>
</section>

<section class="ab-section">
    <div class="ab-container ab-contact">
        <div class="ab-contact__info">
            <article class="ab-info-card">
                <h3><?php esc_html_e('Phone Number', 'adirebloom'); ?></h3>
                <a href="tel:+2348081671129">+234 808 167 1129</a>
            </article>
            <article class="ab-info-card">
                <h3><?php esc_html_e('Address Location', 'adirebloom'); ?></h3>
                <a href="https://maps.google.com/?q=Lagos+State+University+Ojo+Campus+Lagos+Nigeria" target="_blank" rel="noopener noreferrer">Lagos State University, Ojo Campus</a>
            </article>
            <article class="ab-info-card">
                <h3><?php esc_html_e('Mail Address', 'adirebloom'); ?></h3>
                <a href="mailto:adirebloom@gmail.com">adirebloom@gmail.com</a>
            </article>
            <p class="ab-copy"><strong><?php esc_html_e('Hours:', 'adirebloom'); ?></strong> Mon – Sat: 9am – 6pm WAT</p>
        </div>

        <div class="ab-contact__form">
            <?php if (shortcode_exists('contact-form-7')) : ?>
                <?php echo do_shortcode('[contact-form-7 title="Contact"]'); ?>
            <?php else : ?>
                <form class="ab-form" action="#" method="post">
                    <label><?php esc_html_e('Name', 'adirebloom'); ?><input type="text" name="name" required></label>
                    <label><?php esc_html_e('Email', 'adirebloom'); ?><input type="email" name="email" required></label>
                    <label><?php esc_html_e('Subject', 'adirebloom'); ?><input type="text" name="subject"></label>
                    <label><?php esc_html_e('Message', 'adirebloom'); ?><textarea name="message" rows="5" required></textarea></label>
                    <button type="submit" class="ab-btn ab-btn--primary"><?php esc_html_e('Send Message', 'adirebloom'); ?></button>
                    <p class="ab-note"><?php esc_html_e('Install Contact Form 7 on WordPress.com to make this form send email.', 'adirebloom'); ?></p>
                </form>
            <?php endif; ?>
        </div>
    </div>
</section>

<?php get_footer(); ?>
