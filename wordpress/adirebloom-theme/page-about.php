<?php
get_header();
?>

<section class="ab-page-hero ab-page-hero--about">
    <div class="ab-container ab-page-hero__inner">
        <p class="ab-label"><?php esc_html_e('Our Story', 'adirebloom'); ?></p>
        <h1 class="ab-heading ab-heading--light"><?php esc_html_e('Where Heritage Meets Modernity', 'adirebloom'); ?></h1>
        <p class="ab-copy ab-copy--light"><?php esc_html_e('AdireBloom began with a simple conviction: that the most beautiful clothing in the world has always been made by hand, rooted in culture, and passed down through people who cared.', 'adirebloom'); ?></p>
    </div>
</section>

<section class="ab-section">
    <div class="ab-container ab-split">
        <div>
            <p class="ab-label"><?php esc_html_e('The Beginning', 'adirebloom'); ?></p>
            <h2 class="ab-heading"><?php esc_html_e('Born from a Love of Adire', 'adirebloom'); ?></h2>
            <div class="ab-copy">
                <p><?php esc_html_e('The tradition of Adire — "to tie and dye" in Yoruba — stretches back centuries in South-Western Nigeria.', 'adirebloom'); ?></p>
                <p><?php esc_html_e('AdireBloom was founded to give this tradition the platform it deserves: a premium brand that treats Adire not as folk craft, but as high fashion with deep roots.', 'adirebloom'); ?></p>
                <p><?php esc_html_e('We work directly with skilled artisans — paying fair prices, respecting the time and skill involved, and translating their work into garments designed for the modern African and the global diaspora.', 'adirebloom'); ?></p>
            </div>
        </div>
        <div class="ab-about-grid">
            <img src="<?php echo esc_url(adirebloom_asset('about-fabric-1.jpg')); ?>" alt="">
            <img src="<?php echo esc_url(adirebloom_asset('about-fabric-2.jpg')); ?>" alt="">
        </div>
    </div>
</section>

<section class="ab-section ab-section--soft">
    <div class="ab-container">
        <div class="ab-section__head ab-section__head--center">
            <p class="ab-label"><?php esc_html_e('What We Stand For', 'adirebloom'); ?></p>
            <h2 class="ab-heading"><?php esc_html_e('Our Values', 'adirebloom'); ?></h2>
        </div>
        <div class="ab-values">
            <?php
            $values = [
                ['title' => 'Authentic Craft', 'body' => 'We work only with artisans trained in traditional Adire techniques — no machine shortcuts, no synthetic shortcuts.'],
                ['title' => 'Cultural Stewardship', 'body' => 'Every piece sold funds the continuation of Yoruba textile traditions in our partner communities.'],
                ['title' => 'Sustainable Practice', 'body' => 'We use plant-based dyes and breathable natural fibres, minimizing chemical impact on our environment.'],
                ['title' => 'Inclusive Sizing', 'body' => 'Heritage belongs to everyone. Our pieces are available from XS to 4XL, and every bespoke is made to your measure.'],
            ];
            foreach ($values as $value) :
                ?>
                <article class="ab-value-card">
                    <h3><?php echo esc_html($value['title']); ?></h3>
                    <p><?php echo esc_html($value['body']); ?></p>
                </article>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<?php get_footer(); ?>
