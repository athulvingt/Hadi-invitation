const config = {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                gold: 'var(--color-gold)',
                'gold-light': 'var(--color-gold-light)',
                bg: 'var(--color-bg)',
                surface: 'var(--color-surface)',
                text: 'var(--color-text)',
                accent: 'var(--color-accent)',
            },
            fontFamily: {
                display: 'var(--font-display)',
                body: 'var(--font-body)',
            },
            borderRadius: {
                card: 'var(--radius-card)',
            },
            boxShadow: {
                gold: 'var(--shadow-gold)',
            },
        },
    },
    plugins: [],
};
export default config;
