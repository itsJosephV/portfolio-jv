import * as Popover from "@radix-ui/react-popover";
import {useEffect, useState} from "react";

import {DarkIcon} from "../icons/DarkIcon";
import {LightIcon} from "../icons/LightIcon";
import {SystemIcon} from "../icons/SystemIcon";

type Props = {
  theme: string | null;
  setTheme: (theme: string) => void;
};

const ThemeToggle = ({theme, setTheme}: Props) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const themeOptions = ["Dark", "Light", "System"];
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const element = document.documentElement;

  useEffect(() => {
    const onWindowMatch = () => {
      if (localStorage.theme === "dark" || (!("theme" in localStorage) && darkQuery.matches)) {
        element.classList.add("dark");
      } else {
        element.classList.remove("dark");
      }
    };

    switch (theme) {
      case "dark":
        element.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;
      case "light":
        element.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;
      default:
        localStorage.removeItem("theme");
        onWindowMatch();
        break;
    }
  }, [theme, darkQuery.matches, element.classList]);

  useEffect(() => {
    const listener = (e: any) => {
      if ("theme" in localStorage) {
        return;
      }

      if (e.matches) {
        element.classList.add("dark");
      } else {
        element.classList.remove("dark");
      }
    };

    darkQuery.addEventListener("change", listener);

    return () => {
      darkQuery.removeEventListener("change", listener);
    };
  }, [darkQuery, element.classList]);

  function themeIconToggle() {
    switch (theme) {
      case "dark":
        return <DarkIcon className="size-6" />;

      case "light":
        return <LightIcon className="size-6" />;

      case "system":
        return <SystemIcon className="size-6" />;
    }
  }

  const handleThemeButton = (item: string) => {
    setTheme(item.toLocaleLowerCase());
    setIsPopoverOpen(false);
  };

  useEffect(() => {
    console.log(isPopoverOpen, "popover");
  }, [isPopoverOpen]);

  return (
    <Popover.Root
      modal={true}
      open={isPopoverOpen}
      onOpenChange={(isOpen) => {
        setIsPopoverOpen(isOpen);
        console.log(isPopoverOpen, "openchange");
      }}
    >
      <Popover.Trigger className="icon-theme-state cursor-pointer text-zinc-900/50 outline-none duration-200 hover:text-zinc-900 dark:text-zinc-100/50 dark:hover:text-emerald-400">
        {themeIconToggle()}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="z-10 flex min-w-[75px] origin-top flex-col gap-1.5 rounded-md border border-zinc-900/10 bg-zinc-100/70 p-1.5 backdrop-blur-md backdrop-saturate-[180%] rdx-state-closed:animate-fade-out rdx-state-open:animate-fade-in dark:border-zinc-100/10 dark:bg-zinc-900/50"
          side="bottom"
          sideOffset={17}
        >
          {themeOptions.map((item, i) => {
            return (
              <button
                key={i}
                className={`w-full cursor-pointer rounded-md py-0.5 text-center text-xs text-zinc-900 hover:bg-zinc-900/10 dark:text-zinc-100 ${theme === item.toLocaleLowerCase() && "bg-zinc-900/10 dark:bg-zinc-100/10"} outline-none duration-200 dark:hover:bg-zinc-100/10`}
                onClick={() => handleThemeButton(item)}
              >
                {item}
              </button>
            );
          })}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default ThemeToggle;
