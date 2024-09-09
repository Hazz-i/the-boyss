import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";

type Theme = "dark" | "light" | "system";

interface StateContextType {
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with a default value
const StateContext = createContext<StateContextType>({
    darkMode: false,
    setDarkMode: () => {},
});

interface ContextProviderProps {
    children: ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({
    children,
    defaultTheme = "system",
    storageKey = "vite-ui-theme",
}) => {
    const theme = (localStorage.getItem(storageKey) as Theme) || defaultTheme;
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        theme === "system"
            ? window.matchMedia("(prefers-color-scheme: dark)").matches
                ? setDarkMode(true)
                : setDarkMode(false)
            : theme === "dark"
            ? setDarkMode(true)
            : setDarkMode(false);
    }, [theme]);

    return (
        <StateContext.Provider
            value={{
                darkMode,
                setDarkMode,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
