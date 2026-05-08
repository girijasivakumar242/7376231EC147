const getToken = async () => {
  const response = await fetch('http://4.224.186.213/evaluation-service/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'your_email@domain.com', // Replace with your email
      name: 'Your Name', // Replace with your name
      rollNo: 'your_roll_no', // Replace with your roll number
      accessCode: 'your_access_code', // Replace with your access code
      clientID: '91936a87-17da-494c-863e-3151312ab98a',
      clientSecret: 'DFjgGvxcGPUzdrrQ',
    }),
  });

  if (response.ok) {
    const data = await response.json();
    console.log('Access Token:', data.access_token);
    return data.access_token;
  } else {
    console.error('Failed to get token');
  }
};

getToken();