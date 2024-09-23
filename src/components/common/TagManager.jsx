import React, { useState } from 'react';
import './post.css'; // Assuming your CSS is in style.css

const TagManager = () => {
    const maxTags = 999;
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState('');


    const createTagElements = () => {
        return tags.map((tag) => (
            <li key={tag}>
                {tag} <i className="icon" onClick={() => removeTag(tag)}></i>
            </li>
        ));
    };

    const removeTag = (tag) => {
        setTags(tags.filter(t => t !== tag));
    };

    const addTag = (e) => {
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
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyUp={addTag}
                    />
                    {createTagElements()}
                </ul>
            </div>
            <div className="details">
                <button className="mb-3" onClick={clearTags}>모두 지우기</button>
            </div>
        </div>
    );
};

export default TagManager;
