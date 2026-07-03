class Setting {
    private name: string;
    private default_value: any;

    constructor(name: string, default_value: any) {
        this.name = name;
        this.default_value = default_value;
    }

    async set_value(value: any) {
        const storage_update: { [key: string]: any } = {};
        storage_update[this.name] = value;
        await chrome.storage.local.set(storage_update);
    }

    async get_or_set_default_value() {
        let storage_object = await chrome.storage.local.get(this.name);
        let value = storage_object[this.name];
        if (value === undefined) {
            await this.set_value(this.default_value);
            return this.default_value;
        }
        return value;
    }

    add_on_changed_listener(callback: (new_value: any) => void) {
        chrome.storage.local.onChanged.addListener((changes) => {
            if (changes[this.name] !== undefined) {
                var new_value = changes[this.name].newValue ?? this.default_value;
                callback(new_value);
            }
        });
    }
}

class Boolean_Setting extends Setting {
    constructor(name: string, default_value: boolean) {
        super(name, default_value);
    }

    async is_enabled() {
        return (await this.get_or_set_default_value()) as boolean;
    }
    async enable() {
        await this.set_value(true);
    }
    async disable() {
        await this.set_value(false);
    }

    add_on_enabled_listener(callback: () => void) {
        this.add_on_changed_listener(function (new_value: boolean) {
            if (new_value === true) {
                callback();
            }
        });
    }
    add_on_disabled_listener(callback: () => void) {
        this.add_on_changed_listener(function (new_value: boolean) {
            if (new_value === false) {
                callback();
            }
        });
    }
}

const Restructure_Notifications_Setting = new Boolean_Setting("restructure_notifications", true);
const Highlight_Important_Notifications_Setting = new Boolean_Setting("highlight_important_notifications", false);

export { Restructure_Notifications_Setting, Highlight_Important_Notifications_Setting };
