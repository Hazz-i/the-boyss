import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ThemeProvider } from "./Components/theme-provider";
import { Toaster } from "./Components/ui/toaster";
import { ContextProvider } from "./Context/contextProvider";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ContextProvider>
                <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                    <App {...props} />
                    <Toaster />
                </ThemeProvider>
            </ContextProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
