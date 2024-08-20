import "../App.scss";
import useUser from "@/hooks/useUser";
import NavBar from "@/components/NavBar";
import Button from "@/components/Button";
import React, {useMemo, useState} from "react";
import TextField from "@/components/TextField";
import useFormEmptyFields from "@/hooks/useFormEmptyFields";
import {toast} from "react-toastify";
import {LogOutIcon, SaveIcon} from "@/Icons";
import {SingleFileField} from "@/components/FileFields";

const Profile: React.FC = () => {
  const {user, updateUser, logout} = useUser();

  const [name, setName] = useState(user?.displayName || "");
  const [image, setImage] = useState<string | File>(user?.photoURL || "");

  const [loading, setLoading] = useState(false);

  const {hasEmptyFields, setShowEmptyFields, isFieldEmpty} = useFormEmptyFields(
    {name},
  );

  const hasChanges = useMemo(
    () => name.trim() !== user?.displayName,
    [name, user],
  );

  if (!user) return null;

  const onImageChange = (file: File | undefined) => {
    if (!file) return;
    setImage(file);
  };

  const onSave = async () => {
    if (hasEmptyFields || !hasChanges) {
      setShowEmptyFields(true);
      return;
    }
    try {
      setLoading(true);
      await updateUser({displayName: name.trim()});
      toast.success("Profil mis à jour");
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
      toast.error("Erreur lors de la mise à jour du profil");
    }
  };

  return (
    <div className="flex flex-col gap-8 h-full">
      <NavBar
        leftAction="back"
        name="Profil"
        rightAction={<Button onClick={logout} icon={LogOutIcon} />}
      />
      <SingleFileField
        className="flex w-full items-center gap-8"
        onUnsupportedFile={() => toast.error("Format de fichier non supporté")}
        allowedExtensions={["image/png", "image/jpeg"]}
        value={image}
        button="Modifier ta tête"
        onChange={onImageChange}
        disabled
      />
      <div className="flex flex-col w-full gap-6 grow">
        <h2 className=" text-small-title text-center">Mes informations</h2>
        <TextField
          label="Ton petit nom"
          value={name}
          error={isFieldEmpty("name") ? "Ce champ est obligatoire" : undefined}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField label="Ton email" value={user.email || ""} disabled />
        <button className="text-purple-125 underline">
          Modifier ton mot de passe
        </button>
      </div>
      <Button
        icon={SaveIcon}
        onClick={onSave}
        loading={loading}
        disabled={!hasChanges || !name.trim()}
      >
        Sauvegarder les modifications
      </Button>
    </div>
  );
};

export default Profile;
