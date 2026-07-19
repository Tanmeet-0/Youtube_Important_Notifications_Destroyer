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

    let highlight_colour_red_part_input = document.getElementById("highlight_colour_red_part") as HTMLInputElement | null;
    let highlight_colour_green_part_input = document.getElementById("highlight_colour_green_part") as HTMLInputElement | null;
    let highlight_colour_blue_part_input = document.getElementById("highlight_colour_blue_part") as HTMLInputElement | null;

    let highlight_colour_box = document.getElementById("highlight_colour_box") as HTMLDivElement | null;

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

    async function set_default_values_for_highlight_colour_inputs_and_box() {
        let current_highlight_colour = (await Highlight_Colour_Setting.get_value()) as string;

        let highlight_colour_red_part = current_highlight_colour.substring(1, 3);
        let highlight_colour_green_part = current_highlight_colour.substring(3, 5);
        let highlight_colour_blue_part = current_highlight_colour.substring(5, 7);

        highlight_colour_red_part_input!.value = parseInt(highlight_colour_red_part, 16).toString();
        highlight_colour_green_part_input!.value = parseInt(highlight_colour_green_part, 16).toString();
        highlight_colour_blue_part_input!.value = parseInt(highlight_colour_blue_part, 16).toString();

        highlight_colour_box!.style.backgroundColor = current_highlight_colour;
        highlight_colour_box!.style.color = current_highlight_colour;
    }

    async function change_highlight_colour() {
        let highlight_colour_red_part = parseInt(highlight_colour_red_part_input!.value).toString(16).padStart(2, "0");
        let highlight_colour_green_part = parseInt(highlight_colour_green_part_input!.value).toString(16).padStart(2, "0");
        let highlight_colour_blue_part = parseInt(highlight_colour_blue_part_input!.value).toString(16).padStart(2, "0");

        let new_highlight_color = "#" + highlight_colour_red_part + highlight_colour_green_part + highlight_colour_blue_part;

        await Highlight_Colour_Setting.set_value(new_highlight_color);
    }
    highlight_colour_red_part_input!.addEventListener("input", async function () {
        await change_highlight_colour();
    });
    highlight_colour_green_part_input!.addEventListener("input", async function () {
        await change_highlight_colour();
    });
    highlight_colour_blue_part_input!.addEventListener("input", async function () {
        await change_highlight_colour();
    });

    Highlight_Colour_Setting.add_on_changed_listener(async function (new_highlight_color) {
        highlight_colour_box!.style.backgroundColor = new_highlight_color;
        highlight_colour_box!.style.color = new_highlight_color;
    });

    //initialization
    change_styles_of_restructure_notifications_buttons();
    change_styles_of_highlight_important_notifications_buttons();
    set_default_values_for_highlight_colour_inputs_and_box();
});
