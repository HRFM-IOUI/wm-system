// src/pages/Login.js
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Welcome Back</h1>

        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md bg-white/20 text-white border border-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full rounded-md bg-white/20 text-white border border-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="••••••••"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-2 px-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-xl shadow"
          >
            ログイン
          </motion.button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-400">
          <p>
            アカウントをお持ちでないですか？
            <Link to="/subscribe" className="text-pink-400 hover:underline ml-1">
              新規登録
            </Link>
          </p>
          <p className="mt-2">
            <Link to="#" className="text-gray-300 hover:underline">
              パスワードをお忘れですか？
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;