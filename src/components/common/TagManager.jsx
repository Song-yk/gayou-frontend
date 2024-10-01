import { useEffect, useState } from 'react';
import './post.css';

const TagManager = ({ tags, setTags, data }) => {
  const maxTags = 999;
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        if (!tags.includes(data[i])) {
          setTags(prevTags => [...prevTags, data[i]]);
        }
      }
      console.log('Added tags from data:', data);
    }
  }, [data, tags, setTags]);

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
