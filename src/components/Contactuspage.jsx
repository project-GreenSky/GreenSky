import React from "react";

function ContactUsForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    return;
  };

  const InputField = ({ label, id, name, type, required }) => {
    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium mb-1"></label>
        {label}
        <input
          type={type}
          id={id}
          name={name}
          required={required}
          className="mb-6 mt-2 w-full px-3 py-2 bg-transparent text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>
    );
  };

  return (
    <div className="text-white min-h-screen flex items-center justify-center">
      <div
        className="bg-gradient-to-br from-[#323232] to-[#121212] m-3 p-8 rounded-lg shadow-lg w-full max-w-4xl"
        style={{ border: "2px solid #ffffffb1", boxShadow: "0 0 1px #fff" }}
      >
        <h2 className="text-2xl rounded-lg font-semibold mb-6 text-center">
          Contact Us
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InputField
              label="First Name"
              id="firstname"
              name="firstname"
              type="text"
              required
            />
            <InputField
              label="Last Name"
              id="lastname"
              name="lastname"
              type="text"
              required
            />
          </div>
          <InputField
            label="Email"
            id="email"
            name="email"
            type="email"
            required
          />
          <InputField
            label="Subject"
            id="subject"
            name="subject"
            type="text"
            required
          />
          <div>
            <label htmlFor="message" className="block">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="6"
              required
              className="mt-2 w-full px-3 py-2 bg-transparent text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 mt-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactUsForm;
