//import constant values
import * as Constant from '../constant/Constant.js';

/**
 * Get an item in local storage
 *
 * @param  {String} name         item field name
 * @param  {String} defaultValue default value if not found
 * @param  {String} type         type of item to return the right type
 * @return {Object}              value retrieved or default value, type may vary
 */
function getItem(name, defaultValue, type) {

    var value = localStorage.getItem(name);
    if (value === null) {
        localStorage.setItem(name, defaultValue);
        return defaultValue;
    } else {
        if (type) {
            switch (type) {
                case "number":
                    return parseInt(value, 10);
                case "bool":
                    return (value === 'true');
                default:
                    break;
            }
        }
        return value;
    }
}

/**
 * Put key/value in local storage.
 */
function setItem(field, value) {
    localStorage.setItem(field, value);
}

export function getDiagramInput() {
    return atob(getItem("diagram-input", btoa(Constant.defaultDiagramInput)));
}

export function setDiagramInput(data) {
    setItem("diagram-input", btoa(data));
}

export function getDiagramTheme() {
    return getItem("diagram-theme", Constant.defaultDiagramTheme);
}

export function setDiagramTheme(data) {
    setItem("diagram-theme", data);
}

export function getAceTheme() {
    return getItem("ace-theme", Constant.defaultAceTheme);
}

export function setAceTheme(data) {
    setItem("ace-theme", data);
}

export function getConfigView() {
    return getItem("config-view", Constant.defaultConfigView);
}

export function setConfigView(data) {
    setItem("config-view", data);
}

export function getTitle() {
    return getItem("title", Constant.defaultTitle);
}

export function setTitle(data) {
    setItem("title", data);
}

export function getWindowSizeOptions() {
    return JSON.parse(getItem("window-size", JSON.stringify(Constant.defaultWindowSizeOption)));
}

export function setWindowSizeOption(data) {
    setItem("window-size", JSON.stringify(data));
}
