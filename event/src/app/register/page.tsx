import React from 'react';

const Register = () => {
  return (
    <section className="flex items-center justify-center w-96">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-semibold text-gray-100 mb-6">Register</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="username" className="text-gray-200 block mb-1">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="text-gray-200 block mb-1">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="text-gray-200 block mb-1">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="text-gray-200 block mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
