import { Restructure_Notifications_Setting, Highlight_Important_Notifications_Setting } from "./settings";

window.addEventListener("load", () => {
    let document_observer = new MutationObserver(observe_document_to_add_observer_to_notification_panel);
    document_observer.observe(document, { subtree: true, childList: true });
});

var notification_panel: HTMLDivElement | null = null;
var important_notifications: null | NodeListOf<Element> = null;

let observe_document_to_add_observer_to_notification_panel: MutationCallback = function (mutations, my_observer) {
    let notification_panel_selector = document.querySelector(
        "ytd-popup-container tp-yt-iron-dropdown div#contentWrapper ytd-multi-page-menu-renderer div#container",
    );
    if (notification_panel_selector !== null) {
        notification_panel = notification_panel_selector as HTMLDivElement;
        let notification_panel_observer = new MutationObserver(observe_notification_panel);
        notification_panel_observer.observe(notification_panel, { attributes: true, attributeFilter: ["hidden"] });
        Restructure_Notifications_Setting.add_on_enabled_listener(restructure_notifications);
        Restructure_Notifications_Setting.add_on_disabled_listener(reset_notifications_structure);
        Highlight_Important_Notifications_Setting.add_on_enabled_listener(highlight_important_notifications);
        Highlight_Important_Notifications_Setting.add_on_disabled_listener(reset_important_notifications_highlight);

        //observer to notification panel added, no need for document observer
        my_observer.disconnect();
    }
};

let observe_notification_panel: MutationCallback = async function (mutations, my_observer) {
    if (notification_panel!.checkVisibility()) {
        await restructure_notifications();
    }
};

async function restructure_notifications() {
    if (await Restructure_Notifications_Setting.is_enabled()) {
        let notification_sections = notification_panel!.querySelectorAll("div#sections yt-multi-page-menu-section-renderer");
        if (notification_sections.length == 2) {
            let important_notifications_section = notification_sections[0] as HTMLElement;
            important_notifications = important_notifications_section.querySelectorAll("div#items ytd-notification-renderer");
            important_notifications_section.style.display = "none";

            let other_notifications_section = notification_sections[1] as HTMLElement;
            let other_notifications_section_name = other_notifications_section.querySelector("div#section-title") as HTMLElement;
            other_notifications_section_name.style.display = "none";

            for (let index = 0; index < important_notifications.length; index += 1) {
                let other_notifications = other_notifications_section.querySelectorAll("div#items ytd-notification-renderer");
                let notification = important_notifications[index] as HTMLElement;
                let notification_age = get_notification_age_in_seconds(notification);
                let low = 0;
                let high = other_notifications.length - 1;
                while (low <= high) {
                    let middle = Math.floor((low + high) / 2);
                    let comparing_notification = other_notifications[middle] as HTMLElement;
                    let comparing_notification_age = get_notification_age_in_seconds(comparing_notification);

                    if (notification_age > comparing_notification_age) {
                        low = middle + 1;
                    } else if (notification_age < comparing_notification_age) {
                        high = middle - 1;
                    } else {
                        low = middle;
                        break;
                    }
                }
                if (low >= other_notifications.length) {
                    let comparing_notification = other_notifications[other_notifications.length - 1] as HTMLElement;
                    comparing_notification.insertAdjacentElement("afterend", notification);
                } else {
                    let comparing_notification = other_notifications[low] as HTMLElement;
                    comparing_notification.insertAdjacentElement("beforebegin", notification);
                }
            }
            highlight_important_notifications();
        }
    }
}

async function reset_notifications_structure() {
    if (important_notifications != null) {
        reset_important_notifications_highlight();
        // the important notifications are currently mixed with the other notifications
        let notification_sections = notification_panel!.querySelectorAll("div#sections yt-multi-page-menu-section-renderer");

        // if important notifications exists, then there are two notification sections
        let important_notifications_section = notification_sections[0] as HTMLElement;
        important_notifications_section.style.display = "";

        let other_notifications_section = notification_sections[1] as HTMLElement;
        let other_notifications_section_name = other_notifications_section.querySelector("div#section-title") as HTMLElement;
        other_notifications_section_name.style.display = "";

        for (let index = 0; index < important_notifications.length; index += 1) {
            // these are the important notifications that are in the important section, initially 0
            let important_notifications_in_correct_section = important_notifications_section.querySelectorAll(
                "div#items ytd-notification-renderer",
            );
            let notification = important_notifications[index] as HTMLElement;
            if (important_notifications_in_correct_section.length == 0) {
                // there are no other notifications to compare age with
                // so just insert the first notification in the correct place
                let important_notifications_outer_div = important_notifications_section.querySelector(
                    "div#items",
                ) as HTMLDivElement;
                important_notifications_outer_div.insertAdjacentElement("afterbegin", notification);
            } else {
                // at least one notification exists for comparison
                let notification_age = get_notification_age_in_seconds(notification);
                let low = 0;
                let high = important_notifications_in_correct_section.length - 1;
                while (low <= high) {
                    let middle = Math.floor((low + high) / 2);
                    let comparing_notification = important_notifications_in_correct_section[middle] as HTMLElement;
                    let comparing_notification_age = get_notification_age_in_seconds(comparing_notification);

                    if (notification_age > comparing_notification_age) {
                        low = middle + 1;
                    } else if (notification_age < comparing_notification_age) {
                        high = middle - 1;
                    } else {
                        low = middle;
                        break;
                    }
                }
                if (low >= important_notifications_in_correct_section.length) {
                    let comparing_notification = important_notifications_in_correct_section[
                        important_notifications_in_correct_section.length - 1
                    ] as HTMLElement;
                    comparing_notification.insertAdjacentElement("afterend", notification);
                } else {
                    let comparing_notification = important_notifications_in_correct_section[low] as HTMLElement;
                    comparing_notification.insertAdjacentElement("beforebegin", notification);
                }
            }
        }
    }
}

async function highlight_important_notifications() {
    // only highlight the important notifications if they have been restructured
    if (await Restructure_Notifications_Setting.is_enabled()) {
        if (await Highlight_Important_Notifications_Setting.is_enabled()) {
            if (important_notifications != null) {
                for (let index = 0; index < important_notifications.length; index += 1) {
                    let notification = important_notifications[index] as HTMLElement;
                    notification.style.backgroundColor = "purple";
                }
            }
        }
    }
}

async function reset_important_notifications_highlight() {
    if (important_notifications != null) {
        for (let index = 0; index < important_notifications.length; index += 1) {
            let notification = important_notifications[index] as HTMLElement;
            notification.style.backgroundColor = "";
        }
    }
}

function get_notification_age_in_seconds(notification: HTMLElement): number {
    let notification_metadata = notification.querySelectorAll("a div.text div.metadata yt-formatted-string");
    let notification_age_element = notification_metadata[1] as HTMLElement;
    let notification_age = notification_age_element.innerText;

    let base_unit_to_seconds_conversion_multiplier: { [key: string]: number } = {
        second: 1,
        minute: 60,
        hour: 60 * 60,
        day: 60 * 60 * 24,
        week: 60 * 60 * 24 * 7,
        month: 60 * 60 * 24 * 7 * 4,
        year: 60 * 60 * 24 * 7 * 4 * 12,
    };
    const age_matcher = new RegExp("(\\d+) (second|minute|hour|day|week|month|year)s? ago");
    let age_data = notification_age.match(age_matcher);
    if (age_data != null) {
        let age_num = parseInt(age_data[1]);
        let age_unit = age_data[2];
        let age_in_seconds = age_num * base_unit_to_seconds_conversion_multiplier[age_unit];
        return age_in_seconds;
    }
    return -1;
}
