"use client";

import { useState } from "react";

const Contact = () => {
  const [messages, setMessages] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errMessages, setErrMessages] = useState("");

  // Handling form input
  const handleMessages = (e: React.ChangeEvent<HTMLTextAreaElement>) => setMessages(e.target.value);
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);


  // Client-side validation
  const validateForm = () => {
    if (!name || !email || !messages) {
      setErrMessages("All fields are required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrMessages("Please enter a valid email address");
      return false;
    }
    setErrMessages("");
    return true;
  };

  // Handle form submission
  const handlePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(name, email, messages);
    return;

    if (validateForm()) {
      // Submit form data to the server
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, messages }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Your message has been sent!");
        setMessages("");
        setName("");
        setEmail("");
      } else {
        setErrMessages(result.error || "Something went wrong");
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <h1 className="text-2xl font-titleFont font-semibold text-primeColor mb-4">
        Contact MINDFUEL
      </h1>
      <form onSubmit={handlePost}>
        <div className="mb-4">
          <label className="text-base font-titleFont font-semibold px-2">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={handleName}
            className="w-full py-2 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label className="text-base font-titleFont font-semibold px-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={handleEmail}
            className="w-full py-2 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="text-base font-titleFont font-semibold px-2">
            Messages
          </label>
          <textarea
            onChange={handleMessages}
            value={messages}
            cols={30}
            rows={3}
            className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor resize-none"
            placeholder="Enter your message here"
          ></textarea>
          {errMessages && (
            <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
              <span className="text-sm italic font-bold">!</span>
              {errMessages}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-44 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;

