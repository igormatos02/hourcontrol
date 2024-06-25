const apiUrl = 'https://timecontrolapi.vercel.app';

export async function list(entity, params = {}) {
    try {
        const url = new URL(`${apiUrl}/api/${entity}`);
        
        // Append query parameters if provided
        if (params && Object.keys(params).length > 0) {
            Object.keys(params).forEach(key => {
                url.searchParams.append(key, params[key]);
            });
        }

        const response = await fetch(url.toString());
        
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

export async function post(entity, params = {}, body = {}) {
    try {
        const url = new URL(`${apiUrl}/api/${entity}`);
        
        // Append query parameters if provided
        if (params && Object.keys(params).length > 0) {
            Object.keys(params).forEach(key => {
                url.searchParams.append(key, params[key]);
            });
        }

        const response = await fetch(url.toString(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        
        if (!response.ok) {
            throw new Error(`Failed to post data: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error posting data:', error);
        return null;
    }
}