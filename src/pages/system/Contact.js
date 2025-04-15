import React, { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const Contact = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('送信中...');

    try {
      if (!executeRecaptcha) {
        alert('reCAPTCHAの準備ができていません');
        return;
      }

      const token = await executeRecaptcha('contact_form');
      console.log('reCAPTCHA Token (Contact):', token);

      // ↓ トークン + フォームデータを送信する処理（ここは開発次第）
      // 例: await fetch('/api/contact', { method: 'POST', body: JSON.stringify({ ...form, token }) });

      setStatus('送信が完了しました！');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('送信に失敗しました');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 text-sm text-gray-800">
      <h1 className="text-2xl font-bold mb-6">お問い合わせ</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="お名前"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="メールアドレス"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          name="message"
          placeholder="お問い合わせ内容"
          rows="5"
          value={form.message}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-6 rounded"
        >
          送信する
        </button>
      </form>
      {status && <p className="mt-4 text-gray-600">{status}</p>}
    </div>
  );
};

export default Contact;
