'use client';
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useSearchParams } from 'next/navigation';
import { signIn, useSession } from "next-auth/react";

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
  background-color: #ffffff;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  width: 500px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease-in-out;
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
  color: #333;
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
    background-color: #0a418c;
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
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #eee;
`;

const FileInput = styled.input`
  margin-top: 15px;
  font-size: 16px;
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

const MenuPopup = () => {
    const { data: session, update } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState(session?.user?.name || "");
    const [profilePicture, setProfilePicture] = useState(session?.user?.image || "");
    const [preview, setPreview] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false); // State to track upload status
    const searchParams = useSearchParams();

    useEffect(() => {
        const configParam = searchParams.get("config");
        setIsOpen(configParam === "true");
    }, [searchParams]);

    const closePopup = () => {
        const url = new URL(window.location.href);
        url.searchParams.delete("config");
        window.history.pushState({}, "", url.toString());
        setIsOpen(false);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            setPreview(URL.createObjectURL(uploadedFile));
        }
    };

    const handleSave = async () => {
        let imageUrl = profilePicture;
        setIsUploading(true); // Start uploading

        try {
            if (file) {
                const formData = new FormData();
                formData.append("file", file);

                const response = await fetch("/api/auth/upload", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) throw new Error("Erro ao fazer upload da imagem");

                const data = await response.json();
                imageUrl = data.imageUrl;

            }

            const saveResponse = await fetch("/api/auth/update", {
                method: "POST",
                body: JSON.stringify({
                    name,
                    image: imageUrl,
                    role: session?.user.role,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!saveResponse.ok) throw new Error("Erro ao atualizar dados do usuário");

            const updatedSession = await saveResponse.json();
            await update({
                name: updatedSession.user.name,
                image: updatedSession.user.image,
            });
            await update();
            closePopup();
        } catch (error) {
            console.error(error);
            alert("Falha ao atualizar os dados.");
        } finally {
            setIsUploading(false); // Stop uploading
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
                
                {/* Nome Field with Label */}
                <InputLabel htmlFor="name">Nome</InputLabel>
                <InputField
                    type="text"
                    id="name"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                />
                
                <FileInput type="file" accept="image/*" onChange={handleFileChange} />
                {preview ? (
                    <ImagePreview src={preview} alt="Prévia da imagem" />
                ) : (
                    profilePicture && <ImagePreview src={profilePicture} alt="Foto de perfil atual" />
                )}
                {isUploading ? <Loader /> : <SaveButton onClick={handleSave}>Salvar Alterações</SaveButton>}
                <CloseButton onClick={closePopup}>Fechar</CloseButton>
            </PopupContent>
        </PopupContainer>
    );
};

export default MenuPopup;
