/**
 * Clever Control Custom Extension for Micro:bit
 */
//% color="#00A3A3" icon="\uf011" block="clever control"
namespace cleverControl {
    let shutdownHandler: () => void = null;
    let isSystemOn = true;

    /**
     * Runs code when the system is turned off
     */
    //% block="on shutdown"
    //% weight=90
    export function onShutdown(handler: () => void) {
        shutdownHandler = handler;
    }

    /**
     * Turns off the system immediately and triggers the shutdown event
     */
    //% block="turn off"
    //% weight=80
    export function turnOff(): void {
        if (isSystemOn) {
            isSystemOn = false;
            if (shutdownHandler) {
                shutdownHandler();
            }
        }
    }

    /**
     * Runs the inside blocks and then immediately turns off
     */
    //% block="run then turn off"
    //% handlerStatement=true
    //% weight=87
    export function runAndTurnOff(body: () => void): void {
        isSystemOn = true;

        // מריץ את כל הבלוקים שהכנסת לבטן של הבלוק
        body();

        // ברגע שהם מסתיימים - מכבה אוטומטית ומקפיץ את ה-on shutdown
        cleverControl.turnOff();
    }

    /**
     * Runs inside blocks for a specific duration in seconds, then turns off
     * @param duration time in seconds before turning off, eg: 5
     */
    //% block="run for $duration seconds then turn off"
    //% handlerStatement=true
    //% weight=85
    export function runAndThenTurnOff(duration: number, body: () => void): void {
        isSystemOn = true;

        body();
        basic.pause(duration * 1000);
        cleverControl.turnOff();
    }
}
