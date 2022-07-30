const request = async (method, url, data) => {
    try {
        const authString = localStorage.getItem('auth');
        const auth = JSON.parse(authString || '{}');

        let headers = {}

        if (auth.accessToken) {
            headers['X-Authorization'] = auth.accessToken;
        }

        let buildRequest;
        
        if (method === "GET") {
            buildRequest = await fetch(url, headers);
        } else {
          buildRequest = fetch(url, {
            method,
            headers: {
                ...headers,
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
          })  
        }
        const response = await buildRequest;
        const result = await response.json();

        return result;

    } catch (error) {
        console.log(error)
    }
    
}
export const get = request.bind({}, 'GET');
export const post = request.bind({}, 'POST');
export const patch = request.bind({}, 'PATCH');
export const put = request.bind({}, 'PUT');
export const remove = request.bind({}, 'DELETE');
