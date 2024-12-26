import * as fs from 'fs';
import * as path from 'path';

type JSONData = Record<string, any>;

export class JSONUtils {
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = path.resolve(filePath);

        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, JSON.stringify({}, null, 2));
        }
    }

    private perform<T = any>(action: string, data?: any): T | undefined {
        try {
            const currentData: JSONData = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));

            let updatedData: JSONData;
            switch (action) {
                case 'read':
                    return currentData as T;
                case 'write':
                    updatedData = data;
                    break;
                case 'update':
                    updatedData = { ...currentData, ...data };
                    break;
                case 'delete':
                    if (!Array.isArray(data)) throw new Error('Data for delete must be an array of keys');
                    updatedData = { ...currentData };
                    data.forEach((key: string) => delete updatedData[key]);
                    break;
                case 'find':
                    if (typeof data !== 'object' || data === null) throw new Error('Data for find must be an object');
                    return Object.entries(currentData).find(([key, value]) => 
                        Object.entries(data).every(([k, v]) => value[k] === v)) as T || undefined;
                default:
                    throw new Error('Invalid action');
            }

            fs.writeFileSync(this.filePath, JSON.stringify(updatedData, null, 2));
            return updatedData as T;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error performing action on JSON file: ${error.message}`);
            }
        }
    }

    // Shortcut methods
    read<T = JSONData>(): T | undefined {
        return this.perform<T>('read');
    }

    write(data: JSONData): void {
        this.perform('write', data);
    }

    update(updates: JSONData): void {
        this.perform('update', updates);
    }

    delete(keys: string[]): void {
        this.perform('delete', keys);
    }

    find<T = [string, any] | null>(criteria: JSONData): T | undefined {
        return this.perform<T>('find', criteria);
    }
}
