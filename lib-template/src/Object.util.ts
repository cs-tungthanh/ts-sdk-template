type ObjectWithIndex = { [key: string]: any };

export class ObjectUtil {
    static pick<T extends ObjectWithIndex, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
        const result = {} as Pick<T, K>;
        for (const key of keys) {
            if (key in obj) {
                result[key] = obj[key];
            }
        }

        return result;
    }

    static omit<T extends ObjectWithIndex, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
        const result = {} as Omit<T, K>;
        for (const key of Object.keys(obj)) {
            if (!keys.includes(key as any)) {
                result[key] = obj[key];
            }
        }

        return result;
    }

    static pickJson<T extends ObjectWithIndex, K extends keyof T>(obj: T, keys: K[]): string {
        return JSON.stringify(this.pick(obj, keys), null, 2);
    }

    /**
     * @returns stringify an object into string with readable format
     */
    static toPrettyJson<T = any>(obj: T | null): string {
        return JSON.stringify(obj, null, 2);
    }

    /**
     * @returns stringify an object into string without space, tab.
     * @returns itself if obj is a string
     */
    static toJsonPayload<T = any>(obj: T | null): string {
        if (typeof obj === 'string') {
            return obj;
        }
        return JSON.stringify(obj);
    }

    /**
     * @description Remove undefined value in object
     * @returns Record<string, any>
     */
    static removeUndefinedValue(obj?: Record<string, any>): Record<string, any> {
        if (!obj) {
            return obj ?? {};
        }

        const result = { ...obj };
        Object.keys(obj).forEach((key) => {
            if (obj[key] === undefined) {
                delete result[key];
            }
        });

        return result;
    }
}
