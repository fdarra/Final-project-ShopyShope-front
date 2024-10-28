import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../JS/Actions/UserActions";
import { Button, Form, Input, InputNumber } from "antd";
import Spinner from "./Spinner";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const onFinish = (values) => {
  console.log(values);
};

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState();
  const [userSelected, setUserSelected] = useState();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.UserReducer.load);
  const Users = useSelector((state) => state.UserReducer.Users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    setUsers(Users);
    console.log("Users:::::", users);
  }, []);

  return (
    <div className="flex w-full">
      <div className="w-full max-w-md mx-auto mt-10">
        {/* Barre de recherche */}
        <input
          type="text"
          placeholder="Rechercher un utilisateur..."
          className="w-full p-3 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Liste des utilisateurs */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {!loading && users ? (
              Array.isArray(users) &&
              users
                .filter((user) =>
                  user.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((user, index) => (
                  <li
                    key={index}
                    className="p-4 flex items-center space-x-3 hover:bg-gray-100"
                    onClick={(e) => setUserSelected(user)} // Pour afficher les détails d'un utilisateur
                  >
                    <div className="flex-shrink-0">
                      {/* Avatar de l'utilisateur */}
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.avatar}
                        alt={`${user.name}'s avatar`}
                      />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </li>
                ))
            ) : (
              <div>
                <Spinner />
              </div>
            )}
          </ul>
        </div>
      </div>

      <div className="w-full">
      <Form
    {...layout}
    name="nest-messages"
    onFinish={onFinish}
    style={{
      maxWidth: 600,
    }}
    validateMessages={validateMessages}
  >
    <Form.Item
      name={['user', 'name']}
      label="Name"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name={['user', 'email']}
      label="Email"
      rules={[
        {
          type: 'email',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name={['user', 'age']}
      label="Phone Number"
      rules={[
        {
          type: 'number',
          min: 0,
          max: 99,
        },
      ]}
    >
      <InputNumber />
    </Form.Item>
  
    <Form.Item
      wrapperCol={{
        ...layout.wrapperCol,
        offset: 8,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
      </div>
    </div>
  );
};

export default Users;
