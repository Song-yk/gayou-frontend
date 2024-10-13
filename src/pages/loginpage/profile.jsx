import axios from 'axios';
import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import defaultProfileImage from '../../assets/images/defaultProfile.png';
import MyInput from '../../components/common/MyInput';
import './profile.css';

function Profile() {
  const [userData, setUserData] = useState({
    name: '',
    description: '',
    email: '',
    phoneNumber: '',
    birthday: new Date(),
    isGender: true,
    isLocal: false,
    profilePicture: null,
  });
  const token = localStorage.getItem('token');
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: '',
      email: '',
      description: '',
      phoneNumber: '',
      birthday: '',
      isGender: true,
      isLocal: false,
      profilePicture: null,
    },
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      if (token) {
        try {
          const response = await axios.get(`/api/springboot/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = response.data;
          let formattedBirthday = '';
          if (data.birthday) {
            const date = new Date(data.birthday);
            const year = String(date.getFullYear()).slice(2);
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            formattedBirthday = `${year}${month}${day}`;
          }

          setUserData({
            name: data.name || '',
            email: data.email || '',
            description: data.description || '',
            phoneNumber: data.phoneNumber || '',
            birthday: formattedBirthday,
            isGender: data.isGender ?? true,
            isLocal: data.isLocal,
            profilePicture: data.profilePicture || null,
          });
          reset({
            name: data.name || '',
            email: data.email || '',
            description: data.description || '',
            phoneNumber: data.phoneNumber || '',
            birthday: formattedBirthday,
            isGender: data.isGender ?? true,
            isLocal: data.isLocal,
            profilePicture: data.profilePicture || null,
          });
        } catch (error) {
          console.error('Failed to fetch profile data:', error);
        }
      }
    };

    fetchProfileData();
  }, [token]);

  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData(prev => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = isMale => {
    setUserData(prev => ({ ...prev, isGender: isMale }));
  };

  const handleLocalChange = () => {
    setUserData(prev => ({ ...prev, isLocal: !prev.isLocal }));
  };

  const submission = async data => {
    if (window.confirm('변경하시겠습니까?')) {
      try {
        const birthday = data.birthday;
        const year = birthday.substring(0, 2);
        const month = birthday.substring(2, 4);
        const day = birthday.substring(4, 6);

        const currentYear = new Date().getFullYear();
        const fullYear = year <= String(currentYear).substring(2) ? `20${year}` : `19${year}`;

        const formattedBirthday = `${fullYear}-${month}-${day}`;

        const submissionData = {
          ...userData,
          description: userData.description,
          birthday: formattedBirthday,
          name: data.name,
          phoneNumber: data.phoneNumber,
        };

        await axios.post('/api/springboot/auth/profile/update', submissionData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('변경되었습니다.');
      } catch (error) {
        console.error('Failed to update profile:', error);
      }
    }
  };

  return (
    <div className="profile-main-content">
      <ProfilePictureUploader profilePicture={userData.profilePicture} onImageUpload={handleImageUpload} />

      <form className="profile-form" onSubmit={handleSubmit(submission)}>
        <div className="form-group">
          <MyInput
            name="name"
            label="닉네임"
            control={control}
            height="100px"
            rules={{
              required: '닉네임은 필수 항목입니다.',
              minLength: {
                value: 2,
                message: '닉네임은 최소 2자 이상이어야 합니다.',
              },
            }}
          />
        </div>

        <div className="form-group">
          <MyInput
            type="email"
            label="이메일"
            name="email"
            control={control}
            disabled={true}
            rules={{
              required: '이메일은 필수 항목입니다.',
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: '유효한 이메일 주소를 입력해 주세요.',
              },
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">소개</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={userData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="form-group">
          <MyInput
            type="number"
            label="전화번호"
            name="phoneNumber"
            control={control}
            maxLength="11"
            rules={{
              pattern: {
                value: /^[0-9]{10,11}$/,
                message: '전화번호는 10~11자리 숫자만 입력 가능합니다.',
              },
            }}
          />
        </div>
        <MyInput
          type="number"
          label="생년월일"
          place="생년월일 6자리"
          name="birthday"
          control={control}
          maxLength="6"
          rules={{
            pattern: {
              value: /^[0-9]{6}$/,
              message: '생년월일은 6자리 입니다.',
            },
          }}
        />

        <GenderSelection isGender={userData.isGender} onGenderChange={handleGenderChange} />
        <LocalCheckbox isLocal={userData.isLocal} onLocalChange={handleLocalChange} />

        <button type="submit" className="submit-button">
          변경 완료
        </button>
      </form>
    </div>
  );
}

function ProfilePictureUploader({ profilePicture, onImageUpload }) {
  return (
    <div className="profile-picture-section">
      <div className="profile-picture">
        <img src={profilePicture || defaultProfileImage} alt="Profile" className="profile-image" />
      </div>
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        onChange={onImageUpload}
        className="upload-button"
        style={{ display: 'none' }}
      />
      <label
        htmlFor="fileInput"
        className="btn btn-lg btn-light"
        style={{ border: '1px solid black', marginLeft: '20px' }}
      >
        사진 업로드
      </label>
    </div>
  );
}

function GenderSelection({ isGender, onGenderChange }) {
  return (
    <div className="form-group gender-location">
      <div className="gender w-50">
        <label>성별</label>
        <div className="gender-options">
          <label htmlFor="male" style={{ width: '40px' }}>
            남성
          </label>
          <input
            type="radio"
            id="male"
            name="gender"
            value="1"
            checked={isGender === true}
            style={{ width: '10px' }}
            onChange={() => onGenderChange(true)}
          />
          <label htmlFor="female" style={{ width: '40px', marginLeft: '30px' }}>
            여성
          </label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="0"
            checked={isGender === false}
            style={{ width: '10px' }}
            onChange={() => onGenderChange(false)}
          />
        </div>
      </div>
    </div>
  );
}

function LocalCheckbox({ isLocal, onLocalChange }) {
  return (
    <div className="location w-50">
      <div className="location-options">
        <label>대전거주하세요?</label>
        <label className="switch">
          <input type="checkbox" checked={isLocal} onChange={onLocalChange} />
          <span className="slider"></span>
        </label>
        <span>{isLocal ? '예' : '아니요'}</span>
      </div>
    </div>
  );
}

export default Profile;
