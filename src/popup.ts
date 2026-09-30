import {
    Restructure_Notifications_Setting,
    Highlight_Important_Notifications_Setting,
    Highlight_Colour_Setting,
} from "./settings";

window.addEventListener("load", async function () {
    let restructure_notifications_enable_button = document.getElementById(
        "enable_restructuring_notifications",
    ) as HTMLButtonElement | null;
    let restructure_notifications_disable_button = document.getElementById(
        "disable_restructuring_notifications",
    ) as HTMLButtonElement | null;

    let highlight_important_notifications_enable_button = document.getElementById(
        "enable_highlighting_important_notification",
    ) as HTMLButtonElement | null;
    let highlight_important_notifications_disable_button = document.getElementById(
        "disable_highlighting_important_notification",
    ) as HTMLButtonElement | null;

    let highlight_colour_input = document.getElementById("highlight_colour") as HTMLInputElement | null;

    restructure_notifications_enable_button!.addEventListener("click", async function () {
        await Restructure_Notifications_Setting.enable();
        restructure_notifications_enable_button!.classList.add("selected");
        restructure_notifications_disable_button!.classList.remove("selected");
    });
    restructure_notifications_disable_button!.addEventListener("click", async function () {
        await Restructure_Notifications_Setting.disable();
        restructure_notifications_disable_button!.classList.add("selected");
        restructure_notifications_enable_button!.classList.remove("selected");
    });

    highlight_important_notifications_enable_button!.addEventListener("click", async function () {
        await Highlight_Important_Notifications_Setting.enable();
        highlight_important_notifications_enable_button!.classList.add("selected");
        highlight_important_notifications_disable_button!.classList.remove("selected");
    });
    highlight_important_notifications_disable_button!.addEventListener("click", async function () {
        await Highlight_Important_Notifications_Setting.disable();
        highlight_important_notifications_disable_button!.classList.add("selected");
        highlight_important_notifications_enable_button!.classList.remove("selected");
    });

    highlight_colour_input!.addEventListener("input", async function () {
        await Highlight_Colour_Setting.set_value(highlight_colour_input!.value);
    });

    // initialize values
    if (await Restructure_Notifications_Setting.is_enabled()) {
        restructure_notifications_enable_button!.classList.add("selected");
    } else {
        restructure_notifications_disable_button!.classList.add("selected");
    }

    if (await Highlight_Important_Notifications_Setting.is_enabled()) {
        highlight_important_notifications_enable_button!.classList.add("selected");
    } else {
        highlight_important_notifications_disable_button!.classList.add("selected");
    }

    let current_highlight_colour = (await Highlight_Colour_Setting.get_value()) as string;
    highlight_colour_input!.value = current_highlight_colour;
});
