export async function fetchData(email, token) {
    const endpoint = `https://badges.openbadges.me/api/issuedbadgesexternal/email?email=${email}`;
    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
