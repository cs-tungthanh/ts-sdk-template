/**
 * Print hello to console
 */
export async function hello(): Promise<any> {
    console.log('hello');
}

/**
 *
 * @param message
 * @returns
 */
export function Println(message: string): boolean {
    try {
        console.log(message);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}
