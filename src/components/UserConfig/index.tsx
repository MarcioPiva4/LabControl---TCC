'use client';
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from "next-auth/react";

const PopupContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen',
})<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: opacity 0.3s ease, transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? "scale(1)" : "scale(0.9)")};
`;

const PopupContent = styled.div`
  background-color: #0a418c;
  color: #fff;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  width: 500px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease-in-out;
  p{
    color: #fff;
  }
`;

const CloseButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c0392b;
  }
`;

const InputLabel = styled.label`
  width: 100%;
  font-size: 16px;
  color: #fff;
  text-align: left;
  font-weight: 600;
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px;
  margin: 5px 0 12px 0;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: border 0.3s ease;

  &:focus {
    border-color: #041833;
  }
`;

const SaveButton = styled.button`
  background-color: #041833;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #00FF94;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const UserDetails = styled.div`
  margin-bottom: 30px;
  text-align: center;
  font-size: 16px;
  color: #333;
`;

const ImagePreview = styled.img`
  margin-top: 12px;
  max-width: 120px;
  max-height: 120px;
  height: 120px;
  width: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #eee;
`;

const Loader = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4caf50;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
  margin-top: 20px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const StyledFileInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;

  label {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 20px;
    background-color: #041833;
    color: #fff;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #00FF94;
    }

    input {
      display: none;
    }
  }

  .file-name {
    margin-top: 10px;
    font-size: 14px;
    color: #fff;
    text-align: center;
  }
`;

const MenuPopup = () => {
  const { data: session, update } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(session?.user?.name || "");
  const [profilePicture, setProfilePicture] = useState(session?.user?.image || "");
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [professores, setProfessores] = useState<any[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const configParam = searchParams.get("config");
    setIsOpen(configParam === "true");
  }, [searchParams]);

  const fetchProfessores = async () => {
    try {
      const response = await fetch(`/api/professor`);
      const data = await response.json();
      if (data.status === "success") {
        setProfessores(data.data);
        const user = data.data.find((professor: any) => professor.id === session?.user?.id);
        if (user) {
          setProfilePicture(user.image || session?.user?.image);  
        }
      }
    } catch (error) {
      console.error("Erro ao buscar professores:", error);
    }
  };

  const router = useRouter();
  useEffect(() => {
    if (session?.user?.email) {
      fetchProfessores();
    }
  }, [session?.user?.email]);

  const closePopup = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("config");
    window.history.pushState({}, "", url.toString());
    setIsOpen(false);
  };

  const handleSave = async () => {
    setIsUploading(true); 

    try {
      let imageUrl = profilePicture;
      if (file) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64Image = reader.result as string;
          const response = await fetch("/api/auth/update", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              image: base64Image, 
            }),
          });

          if (!response.ok) throw new Error("Erro ao atualizar dados do usuário");

          const updatedSession = await response.json();
          await update({
            name: updatedSession.user.name,
            image: updatedSession.user.image,
          });

          closePopup();
        };
        reader.readAsDataURL(file);
      } else {
        const response = await fetch("/api/auth/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            image: profilePicture,
          }),
        });

        if (!response.ok) throw new Error("Erro ao atualizar dados do usuário");

        const updatedSession = await response.json();
        await update({
          name: updatedSession.user.name,
          image: updatedSession.user.image,
        });
        update();
        closePopup();
      }
    } catch (error) {
      console.error(error);
      alert("Falha ao atualizar os dados.");
    } finally {
      router.refresh();
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <PopupContainer isOpen={isOpen}>
      <PopupContent>
        <h2>Editar Perfil</h2>
        <UserDetails>
          <p><strong>Email:</strong> {session?.user?.email}</p>
          <p><strong>Cargo:</strong> {session?.user?.role === "adm" ? "Administrador" : "Professor"}</p>
        </UserDetails>
        

        <InputLabel>Nome:</InputLabel>
        <InputField
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Imagem do Perfil:</label>
        {profilePicture ? (
          <ImagePreview src={profilePicture} alt="Perfil" />
        ) : (
          <p>Sem imagem</p>
        )}
        <StyledFileInput>
          <label htmlFor="fileInput">
            Escolher Imagem
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
          {file && <p className="file-name">{file.name}</p>}
        </StyledFileInput>
        {preview && <ImagePreview src={preview} alt="Pré-visualização" />}
        
        {isUploading ? (
          <Loader />
        ) : (
          <SaveButton onClick={handleSave}>Salvar</SaveButton>
        )}

        <CloseButton onClick={closePopup}>Fechar</CloseButton>
      </PopupContent>
    </PopupContainer>
  );
};

export default MenuPopup;
