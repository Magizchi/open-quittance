export const actions = {
    login: async ({ request }) => {
        const data = await request.formData();
        console.log('username', data.get('username'))
        console.log('password', data.get('password'))
    }
};