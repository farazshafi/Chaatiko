import { extendTheme } from "@chakra-ui/react";

const theme = {
    config: {
        initialColorMode: "dark",
        useSystemColorMode: true
    },
    styles: {
        global: {
            body: {
                margin: 0,
                "font-family": "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
                "Webkit-font-smoothing": "antialiased",
                "-moz-osx-font-smoothing": "grayscale",
            },
            code: {
                "font-family": "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
            },
            "#status": {
                "text-align": "center",
                "margin-top": "20px",
                "align-self": "center",
            },
            "#modal": {
                "width": "100px",
            },
        },
    },
};

export default extendTheme(theme);
