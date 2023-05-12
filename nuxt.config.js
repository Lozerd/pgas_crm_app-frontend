import logger from "connect-logger";

export default {
    serverMiddleware: [
        logger({ format: "%date %status %method %url (%time)" })
    ],

    target: "server",

    dev: process.env.NODE_ENV !== "production",

    server: {
        port: process.env.port || 3000
    },

    head: {
        title: "Система управления ПГАС ПсковГУ",
        htmlAttrs: {
            lang: "en"
        },
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            },
            { hid: "description", name: "description", content: "" },
            { name: "format-detection", content: "telephone=no" }
        ],
        link: [
            {
                rel: "shortcut icon",
                type: "image/x-icon",
                href: "/favicons/favicon.ico"
            },
            {
                rel: "apple-touch-icon",
                type: "image/png",
                href: "/favicons/apple-touch-icon.png"
            },
            {
                rel: "icon",
                sizes: "16x16",
                type: "image/png",
                href: "/favicons/favicon-16x16.png"
            },
            {
                rel: "icon",
                sizes: "32x32",
                type: "image/png",
                href: "/favicons/favicon-32x32.png"
            }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ["normalize.css/normalize.css"],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: "@/plugins/vee-validate.js" },
        "@/plugins/i18n.js",
        "@/plugins/vue-js-modal.js"
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: ["@nuxtjs/dotenv", "@nuxtjs/style-resources"],

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader"
                ]
            }
        ]
    },

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        "cookie-universal-nuxt",
        "@nuxtjs/axios",
        "@nuxtjs/dotenv",
        "@nuxtjs/i18n"
    ],

    i18n: {
        locales: ["en", "ru"],
        baseUrl: process.env.baseUrl,
        vueI18nLoader: true,
        defaultLocale: "ru",
        vueI18n: {
            fallbackLocale: "ru",
            messages: {
                ru: {
                    validationRules: {
                        required: "Это поле обязательно",
                        email: "Введите валидный email",
                        min: "Минимальная длина {length} символов",
                        confirmed: "Введенные пароли не совпадают"
                    }
                }
            }
        }
    },

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
        proxy: true,
        headers: {
            common: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }
    },

    proxy: {
        "/api/": {
            target: process.env.apiTarget,
            secure: false,
            pathRewrite: {
                "^/api/": ""
            },
            headers: {
                "X-Access-Token": process.env.apiToken
            }
        },
        "/media/": {
            target: process.env.mediaTarget,
            pathRewrite: {
                "^/media/": ""
            },
            headers: {
                "X-Access-Token": process.env.apiToken
            }
        }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        postcss: null,
        transpile: ["vee-validate/dist/rules"]
    },

    styleResources: {
        scss: [
            "@/assets/styles/base/_mixins.scss",
            "@/assets/styles/base/_variables.scss"
        ],
        css: ["@/node_modules/normalize.css/normalize.css"]
    }
};
