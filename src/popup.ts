import { Restructure_Notifications_Setting, Highlight_Important_Notifications_Setting } from "./settings";

window.addEventListener("load", function () {
    let restructure_notifications_enable_button = document.getElementById("enable_restructuring_notifications");
    let restructure_notifications_disable_button = document.getElementById("disable_restructuring_notifications");

    let highlight_important_notifications_enable_button = document.getElementById("enable_highlighting_important_notification");
    let highlight_important_notifications_disable_button = document.getElementById("disable_highlighting_important_notification");

    restructure_notifications_enable_button!.addEventListener("click", async function () {
        await Restructure_Notifications_Setting.enable();
        change_styles_of_restructure_notifications_buttons();
    });
    restructure_notifications_disable_button!.addEventListener("click", async function () {
        await Restructure_Notifications_Setting.disable();
        change_styles_of_restructure_notifications_buttons();
    });

    highlight_important_notifications_enable_button!.addEventListener("click", async function () {
        await Highlight_Important_Notifications_Setting.enable();
        change_styles_of_highlight_important_notifications_buttons();
    });
    highlight_important_notifications_disable_button!.addEventListener("click", async function () {
        await Highlight_Important_Notifications_Setting.disable();
        change_styles_of_highlight_important_notifications_buttons();
    });

    async function change_styles_of_restructure_notifications_buttons() {
        if (await Restructure_Notifications_Setting.is_enabled()) {
            restructure_notifications_enable_button!.classList.add("selected");
            restructure_notifications_disable_button!.classList.remove("selected");
        } else {
            restructure_notifications_disable_button!.classList.add("selected");
            restructure_notifications_enable_button!.classList.remove("selected");
        }
    }
    change_styles_of_restructure_notifications_buttons();

    async function change_styles_of_highlight_important_notifications_buttons() {
        if (await Highlight_Important_Notifications_Setting.is_enabled()) {
            highlight_important_notifications_enable_button!.classList.add("selected");
            highlight_important_notifications_disable_button!.classList.remove("selected");
        } else {
            highlight_important_notifications_disable_button!.classList.add("selected");
            highlight_important_notifications_enable_button!.classList.remove("selected");
        }
    }
    change_styles_of_highlight_important_notifications_buttons();
});
