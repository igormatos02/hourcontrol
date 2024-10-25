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

export async function get(entity, id) {
    try {
        const url = new URL(`${apiUrl}/api/${entity}/${id}`);
        

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


export async function getReport(teamId, employeeId,year,month) {
    try {
      
        const url = new URL(`${apiUrl}/api/report/${teamId}/${employeeId}/${year}/${month}`);
        

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

export async function put(entity, id, body = {}) {
    try {
        const url = new URL(`${apiUrl}/api/${entity}/${id}`);
        
        const response = await fetch(url.toString(), {
            method: 'PUT',  // Changed method to PUT
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        
        if (!response.ok) {
            throw new Error(`Failed to update data: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error updating data:', error);
        return null;
    }
}

export async function remove(entity,id) {
    try {
        const url = new URL(`${apiUrl}/api/${entity}/${id}`);
       
        const response = await fetch(url.toString(), {
            method: 'DELETE',  // Changed method to DELETE
            headers: {
                'Content-Type': 'application/json'
            },
            // No body needed for DELETE requests
        });
        
        if (!response.ok) {
            throw new Error(`Failed to delete data: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error deleting data:', error);
        return null;
    }
}