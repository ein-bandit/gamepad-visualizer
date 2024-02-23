import { writable } from "svelte/store";

interface GamepadDataSnapshot {
    id: string;
    axes: number[];
    buttons: {pressed: boolean}[];
}

export const gamepadDataStore = writable<GamepadDataSnapshot[]>([]);

export const copyGamepadData = (gamepadEvent : Gamepad): GamepadDataSnapshot=> {
    return {
        id: gamepadEvent.id,
        axes: [...gamepadEvent.axes],
        buttons: gamepadEvent.buttons.map(btn => { return {pressed:btn.pressed} })
    }
}