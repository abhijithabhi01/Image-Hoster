// alluserposts.js
import React, { useState } from 'react';
import axios from 'axios';

const alluserposts = ({  }) => {
  const [likes, setLikes] = useState(alluserposts.likes);
  const [dislikes, setDislikes] = useState(alluserposts.dislikes);

  const handleLike = async () => {
    try {
      const response = await axios.alluserposts(`/api/alluserpostss/${alluserposts._id}/like`);
      setLikes(response.data.likes);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDislike = async () => {
    try {
      const response = await axios.alluserposts(`/api/alluserpostss/${alluserposts._id}/dislike`);
      setDislikes(response.data.dislikes);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <p>{alluserposts.content}</p>
      <button onClick={handleLike}>Like ({likes})</button>
      <button onClick={handleDislike}>Dislike ({dislikes})</button>
    </div>
  );
};

export default alluserposts;
