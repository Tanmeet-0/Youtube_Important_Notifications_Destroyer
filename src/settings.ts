import {
    is_restructuring_notifications_enabled,
    enable_restructuring_notifications,
    disable_restructuring_notifications,
    is_highlighting_important_notification_enabled,
    enable_highlighting_important_notification,
    disable_highlighting_important_notification,
} from "./extension_storage";

window.addEventListener("load", function () {
    let restructure_notifications_enable_button = document.getElementById("enable_restructuring_notifications");
    let restructure_notifications_disable_button = document.getElementById("disable_restructuring_notifications");

    let highlight_important_notifications_enable_button = document.getElementById("enable_highlighting_important_notification");
    let highlight_important_notifications_disable_button = document.getElementById("disable_highlighting_important_notification");

    restructure_notifications_enable_button.addEventListener("click", async function () {
        await enable_restructuring_notifications();
        set_style_of_restructure_notifications_button();
    });
    restructure_notifications_disable_button.addEventListener("click", async function () {
        await disable_restructuring_notifications();
        set_style_of_restructure_notifications_button();
    });

    highlight_important_notifications_enable_button.addEventListener("click", async function () {
        await enable_highlighting_important_notification();
        set_style_of_highlight_important_notifications_button();
    });
    highlight_important_notifications_disable_button.addEventListener("click", async function () {
        await disable_highlighting_important_notification();
        set_style_of_highlight_important_notifications_button();
    });

    async function set_style_of_restructure_notifications_button() {
        if (await is_restructuring_notifications_enabled()) {
            restructure_notifications_enable_button.classList.add("selected");
            restructure_notifications_disable_button.classList.remove("selected");
        } else {
            restructure_notifications_disable_button.classList.add("selected");
            restructure_notifications_enable_button.classList.remove("selected");
        }
    }
    set_style_of_restructure_notifications_button();

    async function set_style_of_highlight_important_notifications_button() {
        if (await is_highlighting_important_notification_enabled()) {
            highlight_important_notifications_enable_button.classList.add("selected");
            highlight_important_notifications_disable_button.classList.remove("selected");
        } else {
            highlight_important_notifications_disable_button.classList.add("selected");
            highlight_important_notifications_enable_button.classList.remove("selected");
        }
    }
    set_style_of_highlight_important_notifications_button();
});
