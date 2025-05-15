enum Extension_Settings {
    restructure_notifications = "restructure_notifications",
    highlight_important_notifications = "highlight_important_notifications",
}

const default_settings = new Map<string, any>();
default_settings[Extension_Settings.restructure_notifications] = true;
default_settings[Extension_Settings.highlight_important_notifications] = false;

async function set_setting_value(setting: Extension_Settings, value: any) {
    const storage_update = new Map<string, any>();
    storage_update[setting] = value;
    await chrome.storage.local.set(storage_update);
}

async function get_or_set_default_setting_value(setting: Extension_Settings) {
    let storage_object = await chrome.storage.local.get(setting);
    let setting_value = storage_object[setting];
    if (setting_value === undefined) {
        await set_setting_value(setting, default_settings[setting]);
        return default_settings[setting];
    }
    return setting_value;
}

export async function is_restructuring_notifications_enabled() {
    return (await get_or_set_default_setting_value(Extension_Settings.restructure_notifications)) as boolean;
}

export async function is_highlighting_important_notification_enabled() {
    return (await get_or_set_default_setting_value(Extension_Settings.highlight_important_notifications)) as boolean;
}

export async function enable_restructuring_notifications() {
    await set_setting_value(Extension_Settings.restructure_notifications, true);
}

export async function disable_restructuring_notifications() {
    await set_setting_value(Extension_Settings.restructure_notifications, false);
}

export async function enable_highlighting_important_notification() {
    await set_setting_value(Extension_Settings.highlight_important_notifications, true);
}

export async function disable_highlighting_important_notification() {
    await set_setting_value(Extension_Settings.highlight_important_notifications, false);
}
