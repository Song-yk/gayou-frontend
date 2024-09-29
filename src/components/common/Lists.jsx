import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';

export default function MyCardControls(props) {
  const { user, image, title, town, distance, content, tag, like } = props;
  const [save, usesave] = useState('https://ifh.cc/g/OTp81P.png');
  const [love, uselove] = useState('https://ifh.cc/g/gDSohf.png');
  const navigate = useNavigate();

  const changesave = () => {
    if (save === 'https://ifh.cc/g/OTp81P.png') {
      usesave('https://ifh.cc/g/8vTa4q.png');
    } else {
      usesave('https://ifh.cc/g/OTp81P.png');
    }
  };

  const RemoveHtmlTags = ({ content }) => {
    const removeHtmlTags = str => {
      return str.replace(/<p>|<\/p>/g, '');
    };

    return <p>{removeHtmlTags(content)}</p>;
  };

  const changelove = async () => {
    if (love === 'https://ifh.cc/g/gDSohf.png') {
      uselove('https://ifh.cc/g/Z0nfML.png');
    } else {
      uselove('https://ifh.cc/g/gDSohf.png');
    }
    try {
      // Assuming 'updatedData' and 'token' are available
      const response = await axios.put('/api/springboot/route/like', updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/postlist');
    } catch (error) {}
  };

  const share = 'https://github.com/user-attachments/assets/c2381a16-4bde-4b7a-81ae-c668330f88c8';
  const smallImgStyle = {
    width: '30px',
    height: '30px',
  };

  return (
    <div
      className="mt-2"
      style={{
        backgroundColor: 'none',
        borderRadius: '10px',
        border: '1px solid gray',
      }}
    >
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <img
              className="m-2"
              src="https://ifh.cc/g/R0QZTF.png"
              style={{
                width: '35px',
                height: '35px',
                borderRadius: '50%',
              }}
            />
            <span>{user}</span>
          </div>
          <img className="m-2" src={share} alt="Example" style={smallImgStyle} />
        </div>
        <div className="border-top d-flex justify-content-between align-items-center">
          <CardMedia component="img" sx={{ width: '20%', borderRadius: '1.5em' }} image={image} alt="" />
          <div
            className="내용"
            style={{
              width: '50%',
              height: 'auto',
            }}
          >
            <div>
              <h1>{title}</h1>
              <p>
                {town} | {distance} km
              </p>
              <RemoveHtmlTags content={content} />
              <p>{tag}</p>
            </div>
            <div className="아이콘 mb-2">
              <img className="mr-3" src={love} alt="Example" style={smallImgStyle} onClick={changelove} />
              <img src={save} alt="Example" style={smallImgStyle} onClick={changesave} />
              <p>좋아요 {like}개</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
