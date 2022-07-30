const request = async (method, url, data) => {
    try {
        let buildRequest;
        if (method === "GET") {
            buildRequest = await fetch(url);
        } else {
          buildRequest = fetch(url, {
            method,
            headers: {
                'content-type': 'application/json'
            },
            data: JSON.stringify(data)
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