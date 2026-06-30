</main>

<footer class="ab-footer">
    <div class="ab-container">
        <div class="ab-footer__grid">
            <div>
                <a href="<?php echo esc_url(home_url('/')); ?>">
                    <img src="<?php echo esc_url(adirebloom_asset('logo.png')); ?>" alt="<?php bloginfo('name'); ?>" class="ab-footer__logo">
                </a>
                <p class="ab-footer__tagline">Wear Heritage, Bloom with Style</p>
                <p class="ab-footer__about">Handcrafted Adire garments rooted in Yoruba tradition and shaped for the modern world.</p>
                <div class="ab-footer__social">
                    <a href="https://instagram.com/adirebloom" target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a href="https://facebook.com/adirebloom" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://www.tiktok.com/@adirebloom" target="_blank" rel="noopener noreferrer">TikTok</a>
                    <a href="mailto:adirebloom@gmail.com">Email</a>
                </div>
            </div>

            <div>
                <h4 class="ab-footer__heading"><?php esc_html_e('Shop', 'adirebloom'); ?></h4>
                <ul class="ab-footer__links">
                    <li><a href="<?php echo esc_url(adirebloom_shop_url()); ?>"><?php esc_html_e('All Products', 'adirebloom'); ?></a></li>
                    <li><a href="<?php echo esc_url(home_url('/collections/')); ?>"><?php esc_html_e('Collections', 'adirebloom'); ?></a></li>
                    <li><a href="<?php echo esc_url(adirebloom_shop_url('bespoke-wears')); ?>"><?php esc_html_e('Bespoke Wears', 'adirebloom'); ?></a></li>
                    <li><a href="<?php echo esc_url(adirebloom_shop_url('batik')); ?>"><?php esc_html_e('Batik', 'adirebloom'); ?></a></li>
                    <li><a href="<?php echo esc_url(adirebloom_shop_url('tie-dye-fabrics')); ?>"><?php esc_html_e('Tie & Dye Fabrics', 'adirebloom'); ?></a></li>
                </ul>
            </div>

            <div>
                <h4 class="ab-footer__heading"><?php esc_html_e('Information', 'adirebloom'); ?></h4>
                <ul class="ab-footer__links">
                    <li><a href="<?php echo esc_url(home_url('/about/')); ?>"><?php esc_html_e('About Us', 'adirebloom'); ?></a></li>
                    <li><a href="<?php echo esc_url(get_post_type_archive_link('post') ?: home_url('/blog/')); ?>"><?php esc_html_e('Blog', 'adirebloom'); ?></a></li>
                    <li><a href="<?php echo esc_url(home_url('/contact/')); ?>"><?php esc_html_e('Contact', 'adirebloom'); ?></a></li>
                    <li><a href="<?php echo esc_url(home_url('/faq/')); ?>"><?php esc_html_e('FAQs', 'adirebloom'); ?></a></li>
                </ul>
            </div>

            <div>
                <h4 class="ab-footer__heading"><?php esc_html_e('Stay Connected', 'adirebloom'); ?></h4>
                <p class="ab-footer__about">Get updates on new collections, limited pieces, and heritage stories.</p>
            </div>
        </div>

        <div class="ab-footer__bottom">
            <p>&copy; <?php echo esc_html(date('Y')); ?> <?php bloginfo('name'); ?>. <?php esc_html_e('All rights reserved.', 'adirebloom'); ?></p>
            <div class="ab-footer__legal">
                <a href="<?php echo esc_url(home_url('/terms/')); ?>"><?php esc_html_e('Terms & Conditions', 'adirebloom'); ?></a>
                <a href="<?php echo esc_url(home_url('/refund-policy/')); ?>"><?php esc_html_e('Refund Policy', 'adirebloom'); ?></a>
                <a href="<?php echo esc_url(home_url('/privacy-policy/')); ?>"><?php esc_html_e('Privacy Policy', 'adirebloom'); ?></a>
            </div>
            <p class="ab-footer__paystack"><?php esc_html_e('Payments secured by Paystack', 'adirebloom'); ?></p>
        </div>
        <p class="ab-footer__credit"><a href="https://itsadrex.com" target="_blank" rel="noopener noreferrer">Made by ITS_ADREX</a></p>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
