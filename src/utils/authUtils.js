export const registerUser = async credentials => {
    try {
        console.log(process.env.REACT_APP_BLOG_API);
      const res = await fetch(`${process.env.REACT_APP_BLOG_API}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      console.log(res);
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }
      const data = await res.json();
      return { data };
    } catch (error) {
      return { error };
    }
};

export const loginUser = async credentials => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BLOG_API}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }
      const data = await res.json();
      return { data };
    } catch (error) {
      return { error };
    }
  };

  export const getUser = async token => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BLOG_API}/auth/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }
      const data = await res.json();
      return { data };
    } catch (error) {
      return { error };
    }
  };