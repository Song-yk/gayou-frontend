import { useState } from 'react';
import './post.css'; // Assuming your CSS is in style.css

const TagManager = ({ tags, setTags }) => {
  const maxTags = 999;
  const [inputValue, setInputValue] = useState('');

  const createTagElements = () => {
    return tags.map(tag => (
      <li key={tag}>
        {tag} <i className="icon" onClick={() => removeTag(tag)}></i>
      </li>
    ));
  };

  const removeTag = tag => {
    setTags(tags.filter(t => t !== tag));
  };

  const addTag = e => {
    if (e.key === ' ') {
      const tag = inputValue.trim().replace(/\s+/g, ' ');
      if (tag.length > 1 && !tags.includes(tag)) {
        if (tags.length < maxTags) {
          setTags([...tags, tag]);
        }
      }
      setInputValue('');
    }
  };

  const clearTags = () => {
    setTags([]);
  };

  return (
    <div className="wrapper">
      <div className="content">
        <ul>
          <input
            type="text"
            spellCheck="false"
            placeholder="태그 입력하기"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyUp={addTag}
          />
          <div className="details">
            <button onClick={clearTags}>모두 지우기</button>
          </div>
        </ul>
        <ul className="tags-list">{createTagElements()}</ul>
      </div>
    </div>
  );
};

export default TagManager;
