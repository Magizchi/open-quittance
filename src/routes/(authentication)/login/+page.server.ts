export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        console.log('username', data.get('username'))
        console.log('password', data.get('password'))
    }
};