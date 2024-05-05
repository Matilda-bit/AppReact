export async function fetchAvailableMemes() {
    const response = await fetch('http://localhost:3000/memes');
    const resData = await response.json();
  
    if (!response.ok) {
      throw new Error('Failed to fetch memes');
    }
  
    return resData.memes;
  }
  
  export async function fetchUserMemes() {
    const response = await fetch('http://localhost:3000/user-memes');
    const resData = await response.json();
  
    if (!response.ok) {
      throw new Error('Failed to fetch user memes');
    }
  
    return resData.memes;
  }
  
  export async function updateUserMemes(memes) {
    const response = await fetch('http://localhost:3000/user-memes', {
      method: 'PUT',
      body: JSON.stringify({ memes }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    const resData = await response.json();
  
    if (!response.ok) {
      throw new Error('Failed to update user data.');
    }
  
    return resData.message;
  }