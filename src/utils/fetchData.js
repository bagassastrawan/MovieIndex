async function fetchData({ url }) {
    const response = await fetch(`https://api.themoviedb.org/3/${url}`, {
        headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_ACCES_TOKEN}`,
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data
}

export { fetchData }    