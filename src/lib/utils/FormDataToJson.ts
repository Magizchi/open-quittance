
const FormDataToJson = (data: FormData) => {
    const dataToJson: { [x: string]: string; } = {};
    for (const key of data.keys()) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        dataToJson[key] = data.get(key)!.toString();
    };

    return dataToJson;
};
export default FormDataToJson;