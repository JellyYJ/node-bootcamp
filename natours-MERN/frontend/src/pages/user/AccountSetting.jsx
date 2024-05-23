import { useState } from "react";
import styled from "styled-components";
import Heading from "../../components/Heading";
import Input from "../../components/Input";
import { useUpdateMe } from "./useUpdateMe";
import { server as hostUrl } from "../../config";

const FormGroup = styled.div`
  margin-bottom: 2rem;
`;

const FormLabel = styled.label`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
  display: block;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ProfileImg = styled.img`
  height: 8rem;
  width: 8rem;
  border-radius: 50%;
  margin-right: 0.5rem;
  object-fit: cover;
`;

const FileInput = styled.input`
  display: none;
`;

const UploadButton = styled.label`
  font-size: 1.5rem;
  padding: 0.5rem 0.5rem;
  border-radius: 5px;
  color: var(--color-green-400);
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: var(--color-green-400);
    color: #fff;
    transform: translateY(-0.3rem);
  }
`;

const Button = styled.button`
  font-size: 1.5rem;
  margin-top: 1rem;
  border: none;
  padding: 1.2rem 2.4rem;
  border-radius: 5px;
  background-color: var(--color-green-800);
  color: #fff;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: var(--color-green-500);
  }
`;

function AccountSetting({ curEmail, curName, curPic }) {
  const [email, setEmail] = useState(curEmail);
  const [name, setName] = useState(curName);
  const [file, setFile] = useState(null);
  const { isUpdating, updateMe } = useUpdateMe();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhotoChange = (e) => {
    setFile(e.target.files[0]);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!email || !name) return;

  //   updateMe({ email, name, file });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !name) return;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (file) {
      formData.append("photo", file);
    }

    updateMe(formData);
  };

  // const imageUrl = file ? URL.createObjectURL(file) : `/img/users/${curPic}`;
  // Method2: get photo served from backend
  const imageUrl = file
    ? URL.createObjectURL(file)
    : `${hostUrl}/img/users/${curPic}`;

  return (
    <div>
      <Heading as="h3">Account Information</Heading>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            type="text"
            placeholder={curName}
            required
            minLength="3"
            value={name}
            onChange={handleNameChange}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input
            id="email"
            type="email"
            placeholder={curEmail}
            required
            value={email}
            onChange={handleEmailChange}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Profile Picture</FormLabel>
          <ProfileContainer>
            <ProfileImg src={imageUrl} alt={`Photo of ${curName}`} />
            <UploadButton htmlFor="photo">Upload New Picture</UploadButton>
            <FileInput
              id="photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </ProfileContainer>
        </FormGroup>
        <FormGroup>
          <Button disabled={isUpdating} type="submit">
            {isUpdating ? "Saving..." : "Save Changes"}
          </Button>
        </FormGroup>
      </form>
    </div>
  );
}

export default AccountSetting;
