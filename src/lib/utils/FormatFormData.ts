import type { landlordsTable, propertiesTable } from '$lib/server/schema.js';

type landlordType = typeof landlordsTable.$inferInsert;
type propertyType = typeof propertiesTable.$inferInsert;
type errorType = { message: string; status: number; };
type returnFormat = {
    landlord: landlordType,
    properties: propertyType[],
    error: errorType;
};

const FormatFormData = (data: FormData): returnFormat => {
    const landlord: landlordType = {} as landlordType;
    const properties: propertyType[] = [] as propertyType[];
    let error: errorType = {} as errorType;
    // Create object Landlord and Array of properties with formData
    for (const key of data.keys()) {
        if (key === '' || data.get(key) === '' || data.get(key) === null) {
            error = {
                status: 400,
                message: "Erreur dans les données"
            };
            break;
        }

        if (key.includes('postalCode')) {
            if (data.get(key)!.toString().length > 5) {
                error = {
                    status: 400,
                    message: "Erreur dans les données"
                };
            }
            break;
        }

        const match = key.match(/^properties\[(\d+)\]\[(.+)\]$/);
        if (match) {
            const index = parseInt(match[1], 10);
            const prop = match[2];

            if (!properties[index]) {
                properties[index] = {} as propertyType;
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            properties[index][prop] = data.get(key)!.toString();
        } else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            landlord[key] = data.get(key)!.toString();
        }

    };

    return { landlord, properties, error };
};
export default FormatFormData;