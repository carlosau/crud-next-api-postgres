import { use, useState } from "react";
import { api } from "~/utils/api";

export default function Home() {
  //add constants
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameToUpdate, setNameToUpdate] = useState("");
  const [emailToUpdate, setEmailToUpdate] = useState("");
  const [userId, setUserId] = useState("");
  const [userIdToUpdate, setUserIdToUpdate] = useState("");
  const [userIdToDelete, setUserIdToDelete] = useState("");

  //add functions
  const fetchAllUsers = api.example.getAll.useQuery();
  const fetchOneUser = api.example.getOne.useQuery({ id: userId });
  const createUserMutation = api.example.createUser.useMutation();
  const updateUserMutation = api.example.updateUser.useMutation();
  const deleteUserMutation = api.example.deleteUser.useMutation();

  //app handlers
  const handleCreateUser = async () => {
    try {
      await createUserMutation.mutateAsync({
        name: name,
        email: email,
      });
      setName("");
      setEmail("");
      fetchAllUsers.refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      await updateUserMutation.mutateAsync({
        id: userIdToUpdate,
        name: nameToUpdate,
        email: emailToUpdate,
      });
      setNameToUpdate("");
      setEmailToUpdate("");
      setUserIdToUpdate("");
      fetchAllUsers.refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUserMutation.mutateAsync({
        id: userIdToDelete,
      });
      setUserIdToDelete("");
      fetchAllUsers.refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>UI</h1>
    </div>
  );
}
