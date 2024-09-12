import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/Components/theme-provider";
import { Switch } from "@/Components/ui/switch";

export function SmModeToggle() {
    const { theme, setTheme } = useTheme();
    const darkMode = theme === "dark";
    const handleTheme = () => {
        setTheme(darkMode ? "light" : "dark");
    };

    return (
        <div className="flex items-center justify-between p-2">
            <span className="flex gap-2 items-center">
                <div className="p-3 flex items-center justify-center rounded-lg border bg-gray-200 text-[#368CB6]">
                    {darkMode ? (
                        <Moon className="h-[1.2rem] w-[1.2rem]" />
                    ) : (
                        <Sun className="h-[1.2rem] w-[1.2rem]" />
                    )}
                </div>
                <h1 className="font-semibold">Dark Mode</h1>
            </span>
            <Switch checked={darkMode} onClick={handleTheme} />
        </div>
    );
}
