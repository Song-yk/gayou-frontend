import React from 'react';
import './Lists.css'; // You can style the component separately in this CSS file.

const lists = () => {
    const [myData, setMyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [tag, setTag] = useState([]);
    const [totdistance, setTotDistance] = useState('');
    const [town, setTown] = useState('');
    const [content, setContent] = useState('');
    const [save, usesave] = useState('https://ifh.cc/g/OTp81P.png');
    const [love, uselove] = useState('https://ifh.cc/g/gDSohf.png');

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('/api/springboot/route/data', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMyData(response.data);
                setTitle(response.data.courseName);
            } catch (error) {
                console.error('Error fetching data from the database:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    const changesave = () => {
        if (save === 'https://ifh.cc/g/OTp81P.png') {
            usesave('https://ifh.cc/g/8vTa4q.png');
        } else {
            usesave('https://ifh.cc/g/OTp81P.png');
        }
    };

    const changelove = () => {
        if (love === 'https://ifh.cc/g/gDSohf.png') {
            uselove('https://ifh.cc/g/Z0nfML.png');
        } else {
            uselove('https://ifh.cc/g/gDSohf.png');
        }
    };

    let username = '히타민';
    const share = 'https://github.com/user-attachments/assets/c2381a16-4bde-4b7a-81ae-c668330f88c8';
    const smallImgStyle = {
        width: '30px',
        height: '30px'
    };

    return (
        <div className='mt-2' style={{
            backgroundColor: 'none',
            borderRadius: '10px',
            border: '1px solid gray', // 회색 테두리 설정
        }}>
            <div>
                <div className='d-flex justify-content-between align-items-center'>
                    <div>
                        <img className='m-2' src='https://ifh.cc/g/R0QZTF.png' style={{
                            width: "35px",
                            height: "35px",
                            borderRadius: "50%"
                        }} />
                        <span>{username}</span>
                    </div>
                    <img className='m-2' src={share} alt='Example' style={smallImgStyle} />
                </div>
                <div className='border-top d-flex justify-content-between align-items-center'>
                    {/* <img className='m-3' src={eximg} style={{
            width: "50%",
            height: "auto"
          }} alt={name} /> */}
                    <div className='내용' style={{
                        width: "50%",
                        height: "auto"
                    }}>
                        <div>
                            {myData.map((data, index) => (
                                <div id={index}>
                                    <h1>{data.title}</h1>
                                    <p>{data.town} | {data.totdistance} km</p>
                                    <p>{data.content}</p>
                                    <p>{data.tag}</p>
                                </div>
                            ))}
                        </div>
                        <div className='아이콘 mb-2'>
                            <img src={save} alt='Example' style={smallImgStyle} onClick={changesave} />
                            <img src={love} alt='Example' style={smallImgStyle} onClick={changelove} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default lists;
