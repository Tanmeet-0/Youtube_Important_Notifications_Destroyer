import { is_restructuring_notifications_enabled, is_highlighting_important_notification_enabled } from "./extension_storage";

window.addEventListener("load", () => {
    let document_observer = new MutationObserver(observe_document_to_add_observer_to_notification_panel);
    document_observer.observe(document, { subtree: true, childList: true });
});

let observe_document_to_add_observer_to_notification_panel: MutationCallback = function (mutations, my_observer) {
    let notification_panel_selector = document.querySelector(
        "ytd-popup-container tp-yt-iron-dropdown div#contentWrapper ytd-multi-page-menu-renderer div#container",
    );
    if (notification_panel_selector !== null) {
        let notification_panel = notification_panel_selector as HTMLDivElement;
        let notification_panel_observer = new MutationObserver(observe_notification_panel);
        notification_panel_observer.observe(notification_panel, { attributes: true, attributeFilter: ["hidden"] });

        //observer to notification panel added, no need for document observer
        my_observer.disconnect();
    }
};

let observe_notification_panel: MutationCallback = async function (mutations, my_observer) {
    if (await is_restructuring_notifications_enabled()) {
        for (let mut of mutations) {
            let notification_panel = mut.target as HTMLDivElement;
            if (notification_panel.checkVisibility()) {
                let notification_sections = notification_panel.querySelectorAll(
                    "div#sections yt-multi-page-menu-section-renderer",
                );
                if (notification_sections.length == 2) {
                    let important_notifications_section = notification_sections[0] as HTMLElement;
                    let important_notifications = important_notifications_section.querySelectorAll(
                        "div#items ytd-notification-renderer",
                    );
                    important_notifications_section.remove(); // don't need it anymore

                    let other_notifications_section = notification_sections[1] as HTMLElement;
                    let other_notifications_section_name = other_notifications_section.querySelector(
                        "div#section-title",
                    ) as HTMLElement;
                    other_notifications_section_name.remove(); // don't need a subheading

                    let other_notifications = other_notifications_section.querySelectorAll("div#items ytd-notification-renderer");

                    for (let index = 0; index < important_notifications.length; index += 1) {
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
                        let comparing_notification = other_notifications[low] as HTMLElement;
                        comparing_notification.insertAdjacentElement("beforebegin", notification);
                        if (await is_highlighting_important_notification_enabled()) {
                            notification.style.backgroundColor = "purple";
                        }
                    }
                }
            }
        }
    }
};

function get_notification_age_in_seconds(notification: HTMLElement): number {
    let notification_metadata = notification.querySelectorAll("a div.text div.metadata yt-formatted-string");
    let notification_age_element = notification_metadata[1] as HTMLElement;
    let notification_age = notification_age_element.innerText;

    let base_unit_to_seconds_conversion_multiplier = {
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
    let age_num = parseInt(age_data[1]);
    let age_unit = age_data[2];
    let age_in_seconds = age_num * base_unit_to_seconds_conversion_multiplier[age_unit];
    return age_in_seconds;
}
