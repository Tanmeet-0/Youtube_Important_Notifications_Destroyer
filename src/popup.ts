import {
    Restructure_Notifications_Setting,
    Highlight_Important_Notifications_Setting,
    Highlight_Colour_Setting,
} from "./settings";

window.addEventListener("load", function () {
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

    let highlight_colour_input = document.getElementById("highlight_color") as HTMLInputElement | null;

    async function change_styles_of_restructure_notifications_buttons() {
        if (await Restructure_Notifications_Setting.is_enabled()) {
            restructure_notifications_enable_button!.classList.add("selected");
            restructure_notifications_disable_button!.classList.remove("selected");
        } else {
            restructure_notifications_disable_button!.classList.add("selected");
            restructure_notifications_enable_button!.classList.remove("selected");
        }
    }
    restructure_notifications_enable_button!.addEventListener("click", async function () {
        await Restructure_Notifications_Setting.enable();
        change_styles_of_restructure_notifications_buttons();
    });
    restructure_notifications_disable_button!.addEventListener("click", async function () {
        await Restructure_Notifications_Setting.disable();
        change_styles_of_restructure_notifications_buttons();
    });

    async function change_styles_of_highlight_important_notifications_buttons() {
        if (await Highlight_Important_Notifications_Setting.is_enabled()) {
            highlight_important_notifications_enable_button!.classList.add("selected");
            highlight_important_notifications_disable_button!.classList.remove("selected");
        } else {
            highlight_important_notifications_disable_button!.classList.add("selected");
            highlight_important_notifications_enable_button!.classList.remove("selected");
        }
    }
    highlight_important_notifications_enable_button!.addEventListener("click", async function () {
        await Highlight_Important_Notifications_Setting.enable();
        change_styles_of_highlight_important_notifications_buttons();
    });
    highlight_important_notifications_disable_button!.addEventListener("click", async function () {
        await Highlight_Important_Notifications_Setting.disable();
        change_styles_of_highlight_important_notifications_buttons();
    });

    async function set_default_value_for_highlight_colour_input() {
        let current_highlight_colour = (await Highlight_Colour_Setting.get_value()) as string;
        highlight_colour_input!.value = current_highlight_colour;
    }
    highlight_colour_input!.addEventListener("input", async function () {
        await Highlight_Colour_Setting.set_value(highlight_colour_input!.value);
    });

    //initialization
    change_styles_of_restructure_notifications_buttons();
    change_styles_of_highlight_important_notifications_buttons();
    set_default_value_for_highlight_colour_input();
});
