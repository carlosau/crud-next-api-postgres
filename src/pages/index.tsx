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
    <div className="mx-auto p-4 md:p-8">
      {/*Get all users*/}
      <div className="mb-4">
        <h2 className="mb-4 text-2xl font-bold">Get all Users</h2>
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-400"
          onClick={() => fetchAllUsers.refetch()}
        >
          Get All Users
        </button>
        <div className="mb-2 mt-4 flex gap-2 text-sm font-bold">
          <p className="w-auto">Id</p>
          <p className="w-auto">Name</p>
          <p className="w-auto">Email</p>
        </div>
      </div>
      {fetchAllUsers.data &&
        fetchAllUsers.data.map((user) => (
          <div
            key={user.id}
            className="my-3 flex gap-3 overflow-x-auto rounded border border-gray-300 bg-white p-3 text-sm shadow"
          >
            <p className="w-auto">{user.id}</p>
            <p className="w-auto">{user.name}</p>
            <p className="w-auto">{user.email}</p>
          </div>
        ))}

      {/*Get one user*/}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Get One User</h2>
        <div className="mb-4 flex">
          <input
            className="mr-2 border border-gray-300 p-2"
            placeholder="Enter the user Id"
            value={userId || ""}
            onChange={(e) => setUserId(String(e.target.value))}
          />
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-400"
            onClick={() => fetchOneUser.refetch()}
          >
            Get One User
          </button>
        </div>
        {fetchOneUser.data && (
          <div className="my-3 flex gap-3 overflow-x-auto rounded border border-gray-300 bg-white p-3 text-sm shadow">
            <p className="w-auto">{fetchOneUser.data.id}</p>
            <p className="w-auto">{fetchOneUser.data.name}</p>
            <p className="w-auto">{fetchOneUser.data.email}</p>
          </div>
        )}
      </div>

      {/*Create user*/}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Create User</h2>
        <div className="mb-4 flex">
          <input
            className="mr-2 border border-gray-300 p-2"
            placeholder="Enter the user name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="mr-2 border border-gray-300 p-2"
            placeholder="Enter the user email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-400"
          onClick={handleCreateUser}
        >
          Create User
        </button>
      </div>

      {/*Update user*/}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Update User</h2>
        <div className="mb-4 flex">
          <input
            placeholder="Enter user id to update"
            className="mr-2 border border-gray-300 p-2"
            value={userIdToUpdate}
            onChange={(e) => setUserIdToUpdate(e.target.value)}
          />
          <input
            className="mr-2 border border-gray-300 p-2"
            placeholder="Name to update"
            value={nameToUpdate}
            onChange={(e) => setNameToUpdate(e.target.value)}
          />
          <input
            className="mr-2 border border-gray-300 p-2"
            placeholder="Email to update"
            value={emailToUpdate}
            onChange={(e) => setEmailToUpdate(e.target.value)}
          />
        </div>
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-400"
          onClick={handleUpdateUser}
        >
          Update User
        </button>
      </div>

      {/*Delete user*/}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Delete User</h2>
        <div className="mb-4 flex">
          <input
            placeholder="Enter user id to delete"
            className="mr-2 border border-gray-300 p-2"
            value={userIdToDelete}
            onChange={(e) => setUserIdToDelete(e.target.value)}
          />
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-400"
            onClick={handleDeleteUser}
          >
            Delete User
          </button>
        </div>
      </div>
      
    </div>
  );
}
