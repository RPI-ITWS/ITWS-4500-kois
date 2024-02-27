'use strict';

function LikeButton() {
  const [likes, setLikes] = React.useState(0);
  const [liked, setLiked] = React.useState(false);

  const handleClick = () => {
    setLikes(likes + 1); 
    setLiked(true); 
  };

  const buttonText = liked ? `Liked (${likes})` : `Like (${likes})`;

  return React.createElement(
    'button',
    {
      onClick: handleClick,
      style: {
        backgroundColor: liked ? '#0084ff' : '#555555',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
      },
    },
    buttonText
  );
}

const rootNode = document.getElementById('like-button-root');
const root = ReactDOM.createRoot(rootNode);
root.render(React.createElement(LikeButton));


function LikedButton() {
  const [liked, setLiked] = React.useState(false);

  const buttonText = liked ? 'You liked this!' : 'Like';

  return React.createElement(
    'button',
    {
      onClick: () => setLiked(!liked),
    },
    buttonText
  );
}
const a = document.getElementById('like');
const b = ReactDOM.createRoot(a);
b.render(React.createElement(LikedButton));
