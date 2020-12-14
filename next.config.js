const withPWA = require('next-pwa')

module.exports = withPWA({
    pwa: {
        dest: 'public'
    },
    poweredByHeader: false,
    devIndicators: {
        autoPrerender: false
    }
})